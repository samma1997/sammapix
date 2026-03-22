"use client";

import {
  BookOpen,
  Calendar,
  CalendarDays,
  BarChart3,
  Bot,
  Lightbulb,
  FileText,
  CheckCircle2,
  ArrowDown,
  MessageSquare,
  Link as LinkIcon,
  Search,
  Sparkles,
  PenLine,
  Mail,
  Eye,
  Globe,
  Youtube,
  Clock,
  Database,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Step component                                                     */
/* ------------------------------------------------------------------ */
function Step({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-[10px] font-semibold text-[#6366F1] bg-[#EEF2FF] dark:bg-[#6366F1]/10 w-5 h-5 rounded-[4px] flex items-center justify-center shrink-0 mt-0.5">
        {number}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-[#171717] dark:text-[#E5E5E5]">
          {title}
        </p>
        <p className="text-[13px] text-[#737373] dark:text-[#A3A3A3] mt-0.5 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Auto item component                                                */
/* ------------------------------------------------------------------ */
function AutoItem({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <CheckCircle2
        className="h-4 w-4 text-[#16A34A] shrink-0"
        strokeWidth={1.5}
      />
      <Icon
        className="h-3.5 w-3.5 text-[#A3A3A3] shrink-0"
        strokeWidth={1.5}
      />
      <span className="text-sm text-[#525252] dark:text-[#A3A3A3]">
        {text}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Flow diagram component                                             */
/* ------------------------------------------------------------------ */
function FlowDiagram({ steps }: { steps: string[] }) {
  return (
    <div className="space-y-1">
      {steps.map((step, i) => (
        <div key={i}>
          <div className="bg-[#FAFAFA] dark:bg-[#252525] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] px-4 py-2.5">
            <p className="text-sm text-[#525252] dark:text-[#A3A3A3] leading-relaxed">
              {step}
            </p>
          </div>
          {i < steps.length - 1 && (
            <div className="flex justify-center py-0.5">
              <ArrowDown
                className="h-3.5 w-3.5 text-[#D4D4D4] dark:text-[#404040]"
                strokeWidth={1.5}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section card component                                             */
/* ------------------------------------------------------------------ */
function SectionCard({
  icon: Icon,
  title,
  subtitle,
  accentColor,
  children,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  accentColor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-[#191919] border border-[#E5E5E5] dark:border-[#2A2A2A] rounded-[6px] overflow-hidden">
      <div className="px-5 py-4 border-b border-[#E5E5E5] dark:border-[#2A2A2A] flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-[6px] flex items-center justify-center shrink-0"
          style={{
            backgroundColor: accentColor
              ? `${accentColor}15`
              : "rgba(99,102,241,0.1)",
          }}
        >
          <Icon
            className="h-4 w-4"
            strokeWidth={1.5}
            style={{
              color: accentColor || "#6366F1",
            }}
          />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[#171717] dark:text-[#E5E5E5]">
            {title}
          </h2>
          <p className="text-[11px] text-[#A3A3A3] mt-0.5">{subtitle}</p>
        </div>
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */
export default function GuidaPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 mb-1">
          <BookOpen
            className="h-5 w-5 text-[#6366F1]"
            strokeWidth={1.5}
          />
          <h1 className="text-lg font-semibold text-[#171717] dark:text-[#E5E5E5]">
            Guida operativa
          </h1>
        </div>
        <p className="text-sm text-[#737373] dark:text-[#A3A3A3]">
          Cosa fare ogni giorno, settimana e mese per far crescere SammaPix.
        </p>
      </div>

      {/* ------------------------------------------------------------ */}
      {/*  OGNI GIORNO                                                  */}
      {/* ------------------------------------------------------------ */}
      <SectionCard
        icon={Calendar}
        title="Ogni giorno"
        subtitle="5 minuti"
        accentColor="#16A34A"
      >
        <div className="space-y-4">
          <Step
            number={1}
            title="Apri il Piano"
            description="Controlla la checklist settimanale e vedi cosa resta da fare."
          />
          <Step
            number={2}
            title="Reddit"
            description='Scegli 3-5 post pertinenti, clicca "Genera commento" per ognuno, poi "Copia" e postalo su Reddit. Segna come "Commentato" una volta fatto.'
          />
          <Step
            number={3}
            title="Link Building"
            description='Se hai target pronti nella lista outreach, clicca "Invia" su 1-2 email.'
          />
        </div>
      </SectionCard>

      {/* ------------------------------------------------------------ */}
      {/*  OGNI SETTIMANA                                               */}
      {/* ------------------------------------------------------------ */}
      <SectionCard
        icon={CalendarDays}
        title="Ogni settimana"
        subtitle="Lunedi, 30 minuti"
        accentColor="#D97706"
      >
        <div className="space-y-4">
          <Step
            number={1}
            title="Articoli blog"
            description='Scrivi a Claude Code: "Scrivi 2 articoli blog su [topic]". Lui scrive, ottimizza e pubblica tutto.'
          />
          <Step
            number={2}
            title="Link Building — Controlla risposte"
            description="Vai nella tua inbox email e controlla se qualcuno ha risposto alle outreach. Aggiorna gli stati nella dashboard."
          />
          <Step
            number={3}
            title="Link Building — Nuovi target"
            description='Clicca "Cerca nuovi target" per trovare nuove opportunita di backlink.'
          />
          <Step
            number={4}
            title="SEO"
            description="Controlla le keyword in Search Console: quali salgono, quali scendono, nuove opportunita."
          />
          <Step
            number={5}
            title="Strategia"
            description='Clicca "Genera analisi" nella pagina Strategia e leggi il report con le azioni suggerite.'
          />
        </div>
      </SectionCard>

      {/* ------------------------------------------------------------ */}
      {/*  OGNI MESE                                                    */}
      {/* ------------------------------------------------------------ */}
      <SectionCard
        icon={BarChart3}
        title="Ogni mese"
        subtitle="1 ora"
        accentColor="#6366F1"
      >
        <div className="space-y-4">
          <Step
            number={1}
            title="Piano — Confronta KPI"
            description="Confronta i KPI attuali con i target a 30, 60 e 90 giorni. Sei in linea?"
          />
          <Step
            number={2}
            title="Competitor"
            description="Vai a /dashboard/growth/competitors e controlla se i competitor hanno fatto cambiamenti importanti."
          />
          <Step
            number={3}
            title="Contenuti — Pianifica"
            description="Pianifica i prossimi 8 articoli nel calendario contenuti. Scegli le keyword dal radar SEO."
          />
          <Step
            number={4}
            title="Strategia — Review mensile"
            description='Genera la review mensile dalla pagina Strategia e clicca "Risolvi" sulle azioni suggerite.'
          />
        </div>
      </SectionCard>

      {/* ------------------------------------------------------------ */}
      {/*  AUTOMATICO                                                   */}
      {/* ------------------------------------------------------------ */}
      <SectionCard
        icon={Bot}
        title="Automatico"
        subtitle="Zero lavoro tuo"
        accentColor="#0EA5E9"
      >
        <div className="space-y-3">
          <AutoItem
            icon={MessageSquare}
            text="Reddit scraping giornaliero — nuovi post ogni mattina"
          />
          <AutoItem
            icon={Eye}
            text="Brand monitoring — controlla se SammaPix appare su Google"
          />
          <AutoItem
            icon={Search}
            text="Competitor monitoring — rileva cambiamenti settimanali"
          />
          <AutoItem
            icon={Youtube}
            text="YouTube insights — nuove tattiche SEO ogni lunedi"
          />
          <AutoItem
            icon={Mail}
            text="Follow-up email — ri-manda automaticamente dopo 7 giorni"
          />
          <AutoItem
            icon={Globe}
            text="Cerca target outreach — trova nuovi siti ogni lunedi"
          />
          <AutoItem
            icon={Database}
            text="GSC sync — dati Search Console aggiornati ogni giorno alle 6:00"
          />
        </div>
      </SectionCard>

      {/* ------------------------------------------------------------ */}
      {/*  COME FUNZIONA IL LINK BUILDING                               */}
      {/* ------------------------------------------------------------ */}
      <SectionCard
        icon={Lightbulb}
        title='Come funziona il Link Building'
        subtitle="Il processo step by step"
        accentColor="#D97706"
      >
        <FlowDiagram
          steps={[
            'Tu trovi un sito che ha scritto "Best Image Tools"',
            'Clicchi "Invia" — email personalizzata parte automaticamente',
            "Dopo 7 giorni senza risposta — follow-up automatico",
            'Se rispondono — aggiorni lo stato a "Risposta"',
            'Se aggiungono il link — aggiorni a "Backlink"',
            "Google vede il backlink — SammaPix sale nelle ricerche",
          ]}
        />
      </SectionCard>

      {/* ------------------------------------------------------------ */}
      {/*  COME FUNZIONANO GLI ARTICOLI BLOG                            */}
      {/* ------------------------------------------------------------ */}
      <SectionCard
        icon={FileText}
        title="Come funzionano gli articoli blog"
        subtitle="Il processo step by step"
        accentColor="#16A34A"
      >
        <FlowDiagram
          steps={[
            'Tu scrivi a Claude Code: "Scrivi 2 articoli su [topic]"',
            "Claude Code scrive gli articoli completi (SEO + GEO ottimizzati)",
            "Li pubblica automaticamente su sammapix.com/blog/",
            "Li registra nel calendario contenuti",
            "Google li indicizza — traffico organico",
          ]}
        />
      </SectionCard>

      {/* Bottom spacer */}
      <div className="h-4" />
    </div>
  );
}
