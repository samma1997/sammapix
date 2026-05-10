// Alias route — Stripe webhook è configurato (per errore) a puntare a
// /api/gift/webhook/stripe invece che a /api/gift/webhook. Riusiamo lo stesso
// handler per non richiedere modifiche su Stripe Dashboard e per continuare
// ad accettare eventi storici già pendenti.
export { runtime, POST } from "../route";
