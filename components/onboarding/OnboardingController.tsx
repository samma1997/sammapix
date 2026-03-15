"use client";

/**
 * OnboardingController
 *
 * Manages localStorage state for the persona selection flow.
 * Renders:
 *   - OnboardingModal (when no persona is stored yet)
 *   - PersonalizedTools section (when a real persona is stored)
 *
 * Must be a client component because it reads/writes localStorage and
 * conditionally renders based on that state.
 */

import React, { useEffect, useState } from "react";
import OnboardingModal, { type Persona } from "./OnboardingModal";
import PersonalizedTools from "./PersonalizedTools";

const LS_KEY = "sammapix-persona";

function readPersistedPersona(): Persona | "skipped" | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) return null;
  return raw as Persona | "skipped";
}

export default function OnboardingController() {
  // null  → not yet read (SSR / first render)
  // "skipped" → user dismissed without choosing
  // Persona → user made a choice
  const [stored, setStored] = useState<Persona | "skipped" | null>(null);

  // Show the modal only after we confirm localStorage is empty.
  // Delay gives the page time to render before the modal pops up.
  const [showModal, setShowModal] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const persisted = readPersistedPersona();
    setStored(persisted);
    setHydrated(true);

    if (persisted === null) {
      // First visit — show modal after a short delay
      const t = setTimeout(() => setShowModal(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  function handleModalClose(persona: Persona | null) {
    setShowModal(false);
    if (persona) {
      setStored(persona);
    } else {
      // Skip was chosen — already written to localStorage inside modal
      setStored("skipped");
    }
  }

  function handleChangeRole() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(LS_KEY);
    }
    setStored(null);
    // Small tick so state settles before showing modal
    setTimeout(() => setShowModal(true), 50);
  }

  // During SSR / before hydration — render nothing to avoid mismatch
  if (!hydrated) return null;

  const activePersona =
    stored !== null && stored !== "skipped" ? (stored as Persona) : null;

  return (
    <>
      {showModal && <OnboardingModal onClose={handleModalClose} />}

      {activePersona && (
        <PersonalizedTools
          persona={activePersona}
          onChangeRole={handleChangeRole}
        />
      )}
    </>
  );
}
