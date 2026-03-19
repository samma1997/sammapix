import JSZip from "jszip";

// ─── Image extensions allowed for import ─────────────────────────────────────

const IMAGE_EXTENSIONS = new Set([
  "jpg",
  "jpeg",
  "png",
  "webp",
  "gif",
  "avif",
  "heic",
  "heif",
]);

const EXTENSION_TO_MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  avif: "image/avif",
  heic: "image/heic",
  heif: "image/heif",
};

function getExtension(filename: string): string {
  return (filename.split(".").pop() ?? "").toLowerCase();
}

function isImageFilename(filename: string): boolean {
  return IMAGE_EXTENSIONS.has(getExtension(filename));
}

// ─── ZIP extraction ──────────────────────────────────────────────────────────

/**
 * Extract all image files from a ZIP archive (including nested folders).
 * Returns an array of File objects ready for the dropzone.
 */
export async function extractImagesFromZip(zipFile: File): Promise<File[]> {
  const zip = await JSZip.loadAsync(zipFile);
  const imageFiles: File[] = [];

  const entries: Array<{ name: string; file: JSZip.JSZipObject }> = [];

  zip.forEach((relativePath, zipEntry) => {
    // Skip directories and macOS resource forks
    if (zipEntry.dir) return;
    if (relativePath.startsWith("__MACOSX/")) return;
    if (relativePath.includes("/.")) return; // hidden files

    if (isImageFilename(relativePath)) {
      entries.push({ name: relativePath, file: zipEntry });
    }
  });

  // Process entries in parallel for speed
  const results = await Promise.all(
    entries.map(async (entry) => {
      try {
        const blob = await entry.file.async("blob");
        // Use only the filename (flatten nested folders)
        const filename = entry.name.split("/").pop() ?? entry.name;
        const ext = getExtension(filename);
        const mime = EXTENSION_TO_MIME[ext] ?? "image/jpeg";
        return new File([blob], filename, { type: mime });
      } catch {
        // Skip corrupted entries
        return null;
      }
    })
  );

  for (const file of results) {
    if (file) imageFiles.push(file);
  }

  return imageFiles;
}

// ─── Google Drive Picker ─────────────────────────────────────────────────────

declare global {
  interface Window {
    gapi?: {
      load: (api: string, callback: () => void) => void;
      client: {
        init: (config: Record<string, unknown>) => Promise<void>;
        getToken: () => { access_token: string } | null;
      };
      auth2?: {
        getAuthInstance: () => {
          signIn: (options?: { scope: string }) => Promise<{
            getAuthResponse: () => { access_token: string };
          }>;
          isSignedIn: { get: () => boolean };
          currentUser: {
            get: () => {
              getAuthResponse: () => { access_token: string };
            };
          };
        };
      };
    };
    google?: {
      picker: {
        PickerBuilder: new () => GooglePickerBuilder;
        ViewId: { DOCS_IMAGES: string };
        Action: { PICKED: string; CANCEL: string };
        Feature: { MULTISELECT_ENABLED: string };
      };
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: { access_token?: string; error?: string }) => void;
          }) => { requestAccessToken: () => void };
        };
      };
    };
  }
}

interface GooglePickerBuilder {
  addView: (view: string) => GooglePickerBuilder;
  enableFeature: (feature: string) => GooglePickerBuilder;
  setOAuthToken: (token: string) => GooglePickerBuilder;
  setDeveloperKey: (key: string) => GooglePickerBuilder;
  setCallback: (callback: (data: GooglePickerResponse) => void) => GooglePickerBuilder;
  build: () => { setVisible: (visible: boolean) => void };
}

interface GooglePickerResponse {
  action: string;
  docs?: Array<{
    id: string;
    name: string;
    mimeType: string;
    url: string;
  }>;
}

function loadScript(src: string, id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}

/**
 * Check if Google Drive integration is configured.
 */
export function isGoogleDriveConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_GOOGLE_DRIVE_CLIENT_ID &&
    process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY
  );
}

/**
 * Open Google Drive Picker and let user select images.
 * Returns empty array if env vars are not configured.
 */
export async function pickFromGoogleDrive(): Promise<File[]> {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_CLIENT_ID;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY;

  if (!clientId || !apiKey) return [];

  // Load Google API scripts
  await loadScript("https://apis.google.com/js/api.js", "gapi-script");
  await loadScript("https://accounts.google.com/gsi/client", "gsi-script");

  // Wait for gapi to be ready
  await new Promise<void>((resolve) => {
    window.gapi!.load("picker", () => resolve());
  });

  // Get OAuth token
  const accessToken = await new Promise<string>((resolve, reject) => {
    const tokenClient = window.google!.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "https://www.googleapis.com/auth/drive.readonly",
      callback: (response) => {
        if (response.error) {
          reject(new Error(response.error));
        } else if (response.access_token) {
          resolve(response.access_token);
        } else {
          reject(new Error("No access token received"));
        }
      },
    });
    tokenClient.requestAccessToken();
  });

  // Open Picker
  const docs = await new Promise<GooglePickerResponse["docs"]>(
    (resolve) => {
      const picker = new window.google!.picker.PickerBuilder()
        .addView(window.google!.picker.ViewId.DOCS_IMAGES)
        .enableFeature(window.google!.picker.Feature.MULTISELECT_ENABLED)
        .setOAuthToken(accessToken)
        .setDeveloperKey(apiKey)
        .setCallback((data: GooglePickerResponse) => {
          if (data.action === window.google!.picker.Action.PICKED) {
            resolve(data.docs ?? []);
          } else if (data.action === window.google!.picker.Action.CANCEL) {
            resolve([]);
          }
        })
        .build();
      picker.setVisible(true);
    }
  );

  if (!docs || docs.length === 0) return [];

  // Download selected files
  const files: File[] = [];
  for (const doc of docs) {
    try {
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${doc.id}?alt=media`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (!response.ok) continue;
      const blob = await response.blob();
      const ext = getExtension(doc.name);
      const mime = EXTENSION_TO_MIME[ext] ?? doc.mimeType ?? "image/jpeg";
      files.push(new File([blob], doc.name, { type: mime }));
    } catch {
      // Skip files that fail to download
    }
  }

  return files;
}

// ─── Dropbox Chooser ─────────────────────────────────────────────────────────

declare global {
  interface Window {
    Dropbox?: {
      choose: (options: {
        success: (files: Array<{ link: string; name: string }>) => void;
        cancel: () => void;
        linkType: "direct" | "preview";
        multiselect: boolean;
        extensions: string[];
        folderselect: boolean;
      }) => void;
    };
  }
}

/**
 * Check if Dropbox integration is configured.
 */
export function isDropboxConfigured(): boolean {
  return !!process.env.NEXT_PUBLIC_DROPBOX_APP_KEY;
}

/**
 * Open Dropbox Chooser and let user select images.
 * Returns empty array if env var is not configured.
 */
export async function pickFromDropbox(): Promise<File[]> {
  const appKey = process.env.NEXT_PUBLIC_DROPBOX_APP_KEY;
  if (!appKey) return [];

  // Load Dropbox Chooser script
  await loadScript(
    `https://www.dropbox.com/static/api/2/dropins.js`,
    "dropbox-chooser-script"
  );

  // Set the app key on the script element (Dropbox reads it from data-app-key)
  const scriptEl = document.getElementById("dropbox-chooser-script");
  if (scriptEl) {
    scriptEl.setAttribute("data-app-key", appKey);
  }

  // Wait a tick for Dropbox to initialize
  await new Promise((r) => setTimeout(r, 100));

  if (!window.Dropbox) return [];

  // Open Chooser
  const selectedFiles = await new Promise<
    Array<{ link: string; name: string }>
  >((resolve) => {
    window.Dropbox!.choose({
      success: (files) => resolve(files),
      cancel: () => resolve([]),
      linkType: "direct",
      multiselect: true,
      extensions: [
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
        ".gif",
        ".avif",
        ".heic",
        ".heif",
      ],
      folderselect: false,
    });
  });

  if (selectedFiles.length === 0) return [];

  // Download files
  const files: File[] = [];
  for (const sf of selectedFiles) {
    try {
      const response = await fetch(sf.link);
      if (!response.ok) continue;
      const blob = await response.blob();
      const ext = getExtension(sf.name);
      const mime = EXTENSION_TO_MIME[ext] ?? "image/jpeg";
      files.push(new File([blob], sf.name, { type: mime }));
    } catch {
      // Skip files that fail to download
    }
  }

  return files;
}
