/**
 * SammaPix YouTube Bulk Video Uploader
 * Auto-upload videos with metadata to YouTube channel
 *
 * SETUP:
 * 1. npm install googleapis dotenv
 * 2. Create YouTube app: https://console.cloud.google.com/
 * 3. Get OAuth 2.0 credentials (Desktop application)
 * 4. Save credentials.json in project root
 * 5. Create .env with YOUTUBE_CHANNEL_ID
 *
 * RUN:
 * node youtube-bulk-uploader.js
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const SCOPES = ['https://www.googleapis.com/auth/youtube.upload'];
const TOKEN_PATH = 'youtube_token.json';
const CREDENTIALS_PATH = 'credentials.json';

/**
 * Video metadata for each demo
 */
const videoMetadata = [
  {
    videoFile: './videos/batch-compress.mp4',
    title: 'How to Batch Compress 50 Images in 10 Seconds | SammaPix',
    description: `Learn how to compress multiple images at once with SammaPix.
Free batch image compression tool - no account needed.

• Compress 50+ images simultaneously
• Save up to 80% file size
• Maintain image quality
• Works with all formats

Tool: Batch Image Compressor
Visit: https://sammapix.com/tools/compress

Transform your image workflow with SammaPix - the fastest way to process photos online.`,
    tags: ['batch compress images', 'compress photos', 'image compression', 'free image tools', 'reduce file size', 'image batch processor', 'online image compressor', 'compress multiple images', 'photo compression', 'SammaPix'],
    categoryId: '21', // Video category ID (21 = How-to & Style)
    privacyStatus: 'public',
    playlist: 'Image Compression',
    scheduledStartTime: null // Optional: schedule publish time
  },
  {
    videoFile: './videos/heic-convert.mp4',
    title: 'Convert iPhone HEIC Photos to JPG in Seconds | Free Tool',
    description: `Convert HEIC photos from iPhone to JPG format instantly.
Works with all devices, no uploads needed.

• HEIC → JPG conversion
• Preserve image quality
• Batch convert multiple files
• Zero file size increase

Tool: HEIC to JPG Converter
Visit: https://sammapix.com/tools/heic-to-jpg

Perfect for sharing iPhone photos with friends and on social media.`,
    tags: ['HEIC to JPG', 'iPhone photos', 'convert HEIC', 'JPG converter', 'image format conversion', 'HEIC converter free', 'online converter', 'photo format', 'image tools', 'SammaPix'],
    categoryId: '21',
    privacyStatus: 'public',
    playlist: 'Format Conversion',
    scheduledStartTime: null
  },
  {
    videoFile: './videos/remove-exif.mp4',
    title: 'Remove EXIF & GPS Data from Photos | Protect Your Privacy',
    description: `Strip EXIF and GPS metadata from photos before sharing online.
Protects your location and camera data.

• Remove EXIF metadata
• Remove GPS location data
• Batch process photos
• 100% private - nothing uploaded

Tool: Remove EXIF Data
Visit: https://sammapix.com/tools/remove-exif

Why remove EXIF?
- Prevents location tracking
- Removes camera model info
- Protects metadata
- Safe for social media sharing

Your privacy matters. Remove sensitive data before uploading anywhere.`,
    tags: ['remove EXIF data', 'strip metadata', 'GPS remover', 'EXIF remover', 'photo privacy', 'metadata removal', 'protect location', 'online privacy', 'free EXIF tool', 'image privacy'],
    categoryId: '21',
    privacyStatus: 'public',
    playlist: 'Image Privacy',
    scheduledStartTime: null
  },
  {
    videoFile: './videos/ai-rename.mp4',
    title: 'AI Auto-Rename Photos Based on Content | Smart Photo Names',
    description: `Let AI automatically rename your photos with descriptive names
based on what's in the image.

• AI analyzes photo content
• Generates descriptive names
• Organize photos automatically
• Batch rename all photos

Tool: AI Photo Renamer
Visit: https://sammapix.com/tools/ai-rename

Example transformations:
IMG_1234.jpg → "Red sunset mountain landscape.jpg"
DSC_5678.jpg → "Coffee shop interior with people.jpg"

Features:
- One-click rename
- AI-powered naming
- Batch processing
- Better organization`,
    tags: ['rename photos', 'AI photo renaming', 'bulk rename', 'organize photos', 'photo naming', 'image tagging', 'file rename', 'photo organization', 'batch rename', 'AI tools'],
    categoryId: '21',
    privacyStatus: 'public',
    playlist: 'AI Features',
    scheduledStartTime: null
  },
  {
    videoFile: './videos/convert-webp.mp4',
    title: 'Convert Images to WebP | Speed Up Your Website (40% Smaller)',
    description: `Convert JPG, PNG to WebP format for faster web loading.
WebP images are 40% smaller than JPG.

• Convert to WebP format
• Reduce file size 40%
• Faster website loading
• Maintain quality

Tool: Convert to WebP
Visit: https://sammapix.com/tools/convert-webp

Why WebP?
- Smaller file sizes (40% reduction)
- Better compression algorithm
- Faster loading times
- Better SEO ranking
- Supported by modern browsers

Speed up your website by converting to WebP format instantly.`,
    tags: ['WebP converter', 'image compression', 'web optimization', 'convert to WebP', 'faster website', 'image format', 'JPG to WebP', 'PNG to WebP', 'website speed', 'performance optimization'],
    categoryId: '21',
    privacyStatus: 'public',
    playlist: 'Format Conversion',
    scheduledStartTime: null
  }
];

/**
 * Load or create authorization
 */
async function authorize() {
  let credentials;

  try {
    const credentialsContent = fs.readFileSync(CREDENTIALS_PATH);
    credentials = JSON.parse(credentialsContent);
  } catch (err) {
    console.error('credentials.json not found!');
    console.log('\nSteps to fix:');
    console.log('1. Go to: https://console.cloud.google.com/');
    console.log('2. Create a new project');
    console.log('3. Enable YouTube Data API v3');
    console.log('4. Create OAuth 2.0 Desktop Application credentials');
    console.log('5. Download JSON and save as credentials.json');
    process.exit(1);
  }

  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Check if token exists
  if (fs.existsSync(TOKEN_PATH)) {
    const token = fs.readFileSync(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(token));
  } else {
    // Generate new token
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });

    console.log('Authorize this app by visiting:', authUrl);
    console.log('\nAfter authorization, paste the code here:');

    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const code = await new Promise(resolve => {
      rl.question('Paste authorization code: ', resolve);
    });
    rl.close();

    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
    console.log('✓ Authorization saved');
  }

  return oAuth2Client;
}

/**
 * Upload single video
 */
async function uploadVideo(auth, metadata) {
  const youtube = google.youtube({ version: 'v3', auth });

  console.log(`\n📤 Uploading: ${metadata.title}`);

  if (!fs.existsSync(metadata.videoFile)) {
    console.error(`✗ File not found: ${metadata.videoFile}`);
    return null;
  }

  const fileSize = fs.statSync(metadata.videoFile).size;
  console.log(`   File size: ${(fileSize / 1024 / 1024).toFixed(2)} MB`);

  try {
    const response = await youtube.videos.insert(
      {
        part: 'snippet,status',
        requestBody: {
          snippet: {
            title: metadata.title,
            description: metadata.description,
            tags: metadata.tags,
            categoryId: metadata.categoryId,
            defaultLanguage: 'en',
            defaultAudioLanguage: 'en'
          },
          status: {
            privacyStatus: metadata.privacyStatus,
            publishedAt: metadata.scheduledStartTime || new Date(),
            selfDeclaredMadeForKids: false
          }
        },
        media: {
          body: fs.createReadStream(metadata.videoFile)
        },
        maxResults: 1
      },
      {
        onUploadProgress: event => {
          const progress = (event.bytesReceived / fileSize * 100).toFixed(1);
          process.stdout.write(`\r   Progress: ${progress}%`);
        }
      }
    );

    const videoId = response.data.id;
    console.log(`\n   ✓ Uploaded! Video ID: ${videoId}`);
    console.log(`   View at: https://www.youtube.com/watch?v=${videoId}`);

    return videoId;
  } catch (error) {
    console.error(`   ✗ Upload failed:`, error.message);
    return null;
  }
}

/**
 * Add video to playlist
 */
async function addToPlaylist(auth, videoId, playlistName) {
  if (!videoId || !playlistName) return;

  const youtube = google.youtube({ version: 'v3', auth });

  try {
    // Find playlist by name
    const playlists = await youtube.playlists.list({
      part: 'id,snippet',
      mine: true,
      maxResults: 50
    });

    const playlist = playlists.data.items.find(p => p.snippet.title === playlistName);

    if (!playlist) {
      console.log(`   Note: Playlist "${playlistName}" not found. Skipping...`);
      return;
    }

    await youtube.playlistItems.insert({
      part: 'snippet',
      requestBody: {
        snippet: {
          playlistId: playlist.id,
          resourceId: {
            kind: 'youtube#video',
            videoId: videoId
          }
        }
      }
    });

    console.log(`   ✓ Added to playlist: ${playlistName}`);
  } catch (error) {
    console.warn(`   ⚠ Could not add to playlist:`, error.message);
  }
}

/**
 * Main upload function
 */
async function uploadAllVideos() {
  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║   📤 SammaPix YouTube Bulk Video Uploader 📤          ║');
  console.log('╚════════════════════════════════════════════════════════╝');

  console.log(`\nAuthorizing with YouTube...`);
  const auth = await authorize();
  console.log(`✓ Authorized\n`);

  console.log(`Total videos to upload: ${videoMetadata.length}`);
  console.log(`\nStarting uploads...\n`);

  let successCount = 0;
  let failureCount = 0;

  for (let i = 0; i < videoMetadata.length; i++) {
    const metadata = videoMetadata[i];
    console.log(`[${i + 1}/${videoMetadata.length}]`);

    const videoId = await uploadVideo(auth, metadata);

    if (videoId) {
      // Add to playlist
      if (metadata.playlist) {
        await addToPlaylist(auth, videoId, metadata.playlist);
      }
      successCount++;
    } else {
      failureCount++;
    }

    // Delay between uploads to avoid rate limiting
    if (i < videoMetadata.length - 1) {
      console.log(`   Waiting 5 seconds before next upload...`);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║   ✅ Upload Complete!                                 ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log(`\nResults:`);
  console.log(`  ✓ Successful: ${successCount}`);
  console.log(`  ✗ Failed: ${failureCount}`);
  console.log(`\nNext steps:`);
  console.log(`  1. Go to YouTube Studio: https://studio.youtube.com/`);
  console.log(`  2. Check videos are processing`);
  console.log(`  3. Add channel art and description`);
  console.log(`  4. Create playlists if not already done`);
  console.log(`  5. Schedule videos to publish`);
}

// Run it
uploadAllVideos().catch(error => {
  console.error('\nError:', error);
  process.exit(1);
});
