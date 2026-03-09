export type Lang = 'en' | 'hu' | 'de';

export const translations = {
  // Navbar
  nav: {
    modules: { en: 'Modules', hu: 'Modulok', de: 'Module' },
    features: { en: 'Features', hu: 'Funkciók', de: 'Funktionen' },
    stack: { en: 'Stack', hu: 'Technológia', de: 'Technologie' },
    contact: { en: 'Contact', hu: 'Kapcsolat', de: 'Kontakt' },
    requestDemo: { en: 'Request Demo', hu: 'Demo kérés', de: 'Demo anfordern' },
  },

  // Hero
  hero: {
    tagline: { en: 'Cloud Intelligence', hu: 'Felhő Intelligencia', de: 'Cloud Intelligenz' },
    silenceNoise: { en: 'Silence the noise.', hu: 'Némítsd el a zajt.', de: 'Unterdrücke den Lärm.' },
    seeTheTruth: { en: 'See the truth.', hu: 'Lásd az igazat.', de: 'Sieh die Wahrheit.' },
    desc: {
      en: 'Production, logistics, HR and finance — synchronized in one living system, in real time, from the cloud. Your factory\'s nervous system, elevated.',
      hu: 'Termelés, logisztika, HR és pénzügy — egyetlen élő rendszerben szinkronizálva, valós időben, a felhőből. A gyárad idegrendszere, magasabb szintre emelve.',
      de: 'Produktion, Logistik, HR und Finanzen — synchronisiert in einem lebenden System, in Echtzeit, aus der Cloud. Das Nervensystem Ihrer Fabrik, auf ein neues Level gehoben.',
    },
    watchItWork: { en: '▶ Watch it work', hu: '▶ Nézd meg működés közben', de: '▶ Sieh es in Aktion' },
    exploreModules: { en: 'Explore Modules', hu: 'Modulok felfedezése', de: 'Module entdecken' },
  },

  // Stats
  stats: {
    modules: { en: 'Modules', hu: 'Modulok', de: 'Module' },
    realtimeData: { en: 'Real-time data', hu: 'Valós idejű adat', de: 'Echtzeit-Daten' },
    integrationReady: { en: 'Integration ready', hu: 'Integrációra kész', de: 'Integrationsbereit' },
    hardcodedLogic: { en: 'Hardcoded logic', hu: 'Hardkódolt logika', de: 'Hardcodierte Logik' },
  },

  // Modules Section
  modules: {
    sectionLabel: { en: '// 01 — Modules', hu: '// 01 — Modulok', de: '// 01 — Module' },
    title1: { en: 'Everything your', hu: 'Minden, amit a', de: 'Alles, was Ihre' },
    title2: { en: 'factory needs to know', hu: 'gyáradnak tudnia kell', de: 'Fabrik wissen muss' },
    subtitle: {
      en: 'Admin-configurable. Zero hardcoded logic. Every module runs independently or as a unified system.',
      hu: 'Adminisztrátorból konfigurálható. Nulla hardkódolt logika. Minden modul önállóan vagy egységes rendszerként fut.',
      de: 'Admin-konfigurierbar. Keine hardcodierte Logik. Jedes Modul läuft unabhängig oder als einheitliches System.',
    },
    items: [
      {
        name: { en: 'Headcount Recording', hu: 'Létszám nyilvántartás', de: 'Personalerfassung' },
        desc: {
          en: 'Shift-by-shift headcount by position. Named absence tracking. Full audit log on every change.',
          hu: 'Műszakonkénti létszám pozíció szerint. Névre szóló hiányzás nyilvántartás. Teljes audit napló minden változáson.',
          de: 'Schichtweise Personalzählung nach Position. Namentliche Abwesenheitsverfolgung. Vollständiges Audit-Log bei jeder Änderung.',
        },
        tag: { en: 'Real-time', hu: 'Valós idejű', de: 'Echtzeit' },
      },
      {
        name: { en: 'Daily Minutes', hu: 'Napi Percek', de: 'Tagesminuten' },
        desc: {
          en: 'SAP-based performance measurement. Pull vs. delivery, EUR calculation, shift breakdown to the minute.',
          hu: 'SAP alapú teljesítménymérés. Lehívás vs. szállítás, EUR számítás, műszakbontás percre pontosan.',
          de: 'SAP-basierte Leistungsmessung. Pull vs. Lieferung, EUR-Berechnung, Schichtaufschlüsselung minutengenau.',
        },
        tag: { en: 'SAP Integration', hu: 'SAP Integráció', de: 'SAP Integration' },
      },
      {
        name: { en: 'Operator Performance', hu: 'Operátori Teljesítmény', de: 'Bedienerleistung' },
        desc: {
          en: 'Individual tracking by employee ID. Minutes worked, orders completed, norm comparison.',
          hu: 'Egyéni követés alkalmazotti azonosító alapján. Ledolgozott percek, teljesített megrendelések, norma összehasonlítás.',
          de: 'Individuelle Verfolgung nach Mitarbeiter-ID. Gearbeitete Minuten, abgeschlossene Aufträge, Normvergleich.',
        },
        tag: { en: 'Dashboard', hu: 'Műszerfal', de: 'Dashboard' },
      },
      {
        name: { en: 'Production Tracking', hu: 'Termeléskövetés', de: 'Produktionsverfolgung' },
        desc: {
          en: 'Order lifecycle tracking. Automatic 5+ hour critical wait alerts. Order, material, operator search.',
          hu: 'Megrendelés életciklus követés. Automatikus 5+ óra kritikus várakozás riasztás. Rendelés, anyag, operátor keresés.',
          de: 'Auftrags-Lebenszyklus-Tracking. Automatische 5+ Stunden kritische Warte-Alarme. Auftrags-, Material-, Bedienersuche.',
        },
        tag: { en: 'Alert System', hu: 'Riasztás', de: 'Alarmsystem' },
      },
      {
        name: { en: 'Allocation Table', hu: 'Allokációs tábla', de: 'Zuordnungstabelle' },
        desc: {
          en: 'Production scheduling and capacity planning. Automatic shift rotation in 3-week cycles.',
          hu: 'Termelés ütemezés és kapacitástervezés. Automatikus műszakrotáció 3 hetes ciklusokban.',
          de: 'Produktionsplanung und Kapazitätsplanung. Automatische Schichtrotation in 3-Wochen-Zyklen.',
        },
        tag: { en: 'Shift Management', hu: 'Műszakkezelés', de: 'Schichtmanagement' },
      },
      {
        name: { en: 'Area Performance', hu: 'Terület Teljesítmény', de: 'Bereichsleistung' },
        desc: {
          en: 'Area-by-area reports. Multi-zone breakdown with comparable performance metrics.',
          hu: 'Területenkénti riportok. Többzónás bontás összehasonlítható teljesítménymutatókkal.',
          de: 'Bereich-für-Bereich-Berichte. Multi-Zonen-Aufschlüsselung mit vergleichbaren Leistungskennzahlen.',
        },
        tag: { en: 'Multi-zone', hu: 'Többzónás', de: 'Multi-Zone' },
      },
      {
        name: { en: 'Delivered Products', hu: 'Leszállított Termékek', de: 'Gelieferte Produkte' },
        desc: {
          en: 'Shipping return tracking. Product ID scan support. Full lifecycle visualization.',
          hu: 'Szállítási visszáru követés. Termékazonosító szkennelés. Teljes életciklus vizualizáció.',
          de: 'Versandrückverfolgung. Produkt-ID-Scan-Unterstützung. Vollständige Lebenszyklus-Visualisierung.',
        },
        tag: { en: 'Barcode Ready', hu: 'Vonalkód kész', de: 'Barcode-fähig' },
      },
      {
        name: { en: 'Process Tracking', hu: 'Folyamatkövetés', de: 'Prozessverfolgung' },
        desc: {
          en: 'Throughput time monitoring. Inter-process wait time measurement and alerting.',
          hu: 'Átfutási idő monitorozás. Folyamatok közötti várakozási idő mérés és riasztás.',
          de: 'Durchlaufzeitüberwachung. Messung und Alarmierung der Wartezeit zwischen Prozessen.',
        },
        tag: { en: 'Process Tracking', hu: 'Folyamatkövetés', de: 'Prozessverfolgung' },
      },
      {
        name: { en: 'Admin Panel', hu: 'Admin Panel', de: 'Admin-Panel' },
        desc: {
          en: 'Users, roles, medical fitness, War Room printing. Everything configurable — no code changes needed.',
          hu: 'Felhasználók, szerepkörök, orvosi alkalmasság, War Room nyomtatás. Minden konfigurálható — kódváltoztatás nélkül.',
          de: 'Benutzer, Rollen, ärztliche Tauglichkeit, War Room-Druck. Alles konfigurierbar — keine Codeänderungen nötig.',
        },
        tag: { en: 'Full Control', hu: 'Teljes kontroll', de: 'Volle Kontrolle' },
      },
    ],
  },

  // Features Section
  features: {
    sectionLabel: { en: '// 02 — Core Features', hu: '// 02 — Alapfunkciók', de: '// 02 — Kernfunktionen' },
    title1: { en: 'Built from', hu: 'A gyártósortól', de: 'Von Grund auf' },
    title2: { en: 'the floor up', hu: 'felépítve', de: 'aufgebaut' },
    items: [
      {
        title: { en: 'Automatic Shift Rotation', hu: 'Automatikus műszakrotáció', de: 'Automatische Schichtrotation' },
        text: {
          en: 'A/B/C team night→afternoon→morning rotation. 05:45 shift boundary with date correction. Full UTC/CET handling.',
          hu: 'A/B/C csapat éjszaka→délután→délelőtt rotáció. 05:45 műszakhatár dátumkorrekcióval. Teljes UTC/CET kezelés.',
          de: 'A/B/C Team Nacht→Nachmittag→Morgen-Rotation. 05:45 Schichtgrenze mit Datumskorrektur. Vollständige UTC/CET-Behandlung.',
        },
      },
      {
        title: { en: 'War Room Printing', hu: 'War Room nyomtatás', de: 'War Room Druck' },
        text: {
          en: 'Selected charts print with one click from Admin Panel. Designed for control room wall display.',
          hu: 'Kiválasztott diagramok egy kattintással nyomtathatók az Admin Panelből. Irányítótermi fali kijelzésre tervezve.',
          de: 'Ausgewählte Diagramme mit einem Klick aus dem Admin-Panel drucken. Für die Wandanzeige im Kontrollraum konzipiert.',
        },
      },
      {
        title: { en: 'Complete Audit Trail', hu: 'Teljes audit napló', de: 'Vollständiger Audit-Trail' },
        text: {
          en: 'Every modification logged. Past changes require written justification. Compliance-ready by design.',
          hu: 'Minden módosítás naplózva. Múltbeli változtatások írásos indoklást igényelnek. Compliance-kész kialakítás.',
          de: 'Jede Änderung protokolliert. Vergangene Änderungen erfordern schriftliche Begründung. Compliance-konform konzipiert.',
        },
      },
      {
        title: { en: 'Data-driven UI', hu: 'Adatvezérelt UI', de: 'Datengesteuerte UI' },
        text: {
          en: 'Zero hardcoded roles or logic. Every position, category and rule configurable from Admin Panel.',
          hu: 'Nulla hardkódolt szerepkör vagy logika. Minden pozíció, kategória és szabály az Admin Panelből konfigurálható.',
          de: 'Keine hardcodierten Rollen oder Logik. Jede Position, Kategorie und Regel über das Admin-Panel konfigurierbar.',
        },
      },
      {
        title: { en: 'Pinnable Dashboards', hu: 'Kitűzhető műszerfalak', de: 'Anheftbare Dashboards' },
        text: {
          en: 'Every chart and table is pinnable to the main dashboard. Personalized command center for every role.',
          hu: 'Minden diagram és táblázat kitűzhető a fő műszerfalra. Személyre szabott parancsnoki központ minden szerepkörhöz.',
          de: 'Jedes Diagramm und jede Tabelle kann ans Hauptdashboard angeheftet werden. Personalisiertes Kommandozentrum für jede Rolle.',
        },
      },
    ],
  },

  // Tech Section
  tech: {
    sectionLabel: { en: '// 03 — Technology', hu: '// 03 — Technológia', de: '// 03 — Technologie' },
    title1: { en: 'Modern stack.', hu: 'Modern stack.', de: 'Moderner Stack.' },
    title2: { en: 'Enterprise grade.', hu: 'Vállalati szintű.', de: 'Enterprise-Qualität.' },
  },

  // CTA
  cta: {
    title1: { en: 'Ready to', hu: 'Készen állsz', de: 'Bereit, die' },
    title2: { en: 'see the truth?', hu: 'látni az igazat?', de: 'Wahrheit zu sehen?' },
    subtitle: {
      en: 'Request a demo or reach out for a custom implementation proposal.',
      hu: 'Kérj demót, vagy keress minket egyedi megvalósítási ajánlatért.',
      de: 'Fordern Sie eine Demo an oder kontaktieren Sie uns für ein individuelles Implementierungsangebot.',
    },
    placeholder: { en: 'your@company.com', hu: 'nev@ceg.com', de: 'name@firma.com' },
    send: { en: 'Send →', hu: 'Küldés →', de: 'Senden →' },
    directContact: {
      en: 'or contact us directly: info@ainovacloud.com',
      hu: 'vagy közvetlenül: info@ainovacloud.com',
      de: 'oder direkt kontaktieren: info@ainovacloud.com',
    },
  },

  // Footer
  footer: {
    tagline: { en: '© 2026 ainovacloud.com — Silence the noise. See the truth.', hu: '© 2026 ainovacloud.com — Némítsd el a zajt. Lásd az igazat.', de: '© 2026 ainovacloud.com — Unterdrücke den Lärm. Sieh die Wahrheit.' },
    privacy: { en: 'Privacy', hu: 'Adatvédelem', de: 'Datenschutz' },
    contact: { en: 'Contact', hu: 'Kapcsolat', de: 'Kontakt' },
  },

  // Demo page
  demo: {
    fromSapRows: {
      en: 'From 164,629 SAP rows to one decision.',
      hu: '164,629 SAP sorból egyetlen döntés.',
      de: 'Von 164.629 SAP-Zeilen zu einer Entscheidung.',
    },
    cloudIntelligence: { en: 'Cloud Intelligence · Industry 4.0', hu: 'Felhő Intelligencia · Ipar 4.0', de: 'Cloud Intelligenz · Industrie 4.0' },
    watchItWork: { en: '▶   Watch it work', hu: '▶   Nézd meg működés közben', de: '▶   Sieh es in Aktion' },
    username: { en: 'Username', hu: 'Felhasználónév', de: 'Benutzername' },
    password: { en: 'Password', hu: 'Jelszó', de: 'Passwort' },
    login: { en: 'Sign in', hu: 'Bejelentkezés', de: 'Anmelden' },
    authenticating: { en: 'Authenticating...', hu: 'Hitelesítés...', de: 'Authentifizierung...' },
    advancedNetwork: { en: 'Advanced Intelligent Network Operations', hu: 'Advanced Intelligent Network Operations', de: 'Advanced Intelligent Network Operations' },

    // Dashboard cards
    dailyMinutes: { en: 'Daily Minutes', hu: 'Napi Perces', de: 'Tagesminuten' },
    dailyMinSub: { en: 'min delivered · 92.2% target', hu: 'perc leadva · 92.2% cél', de: 'Min. geliefert · 92,2% Ziel' },
    headcount: { en: 'Headcount', hu: 'Létszám', de: 'Personalstärke' },
    headcountVal: { en: '98 ppl', hu: '98 fő', de: '98 Pers.' },
    headcountSub: { en: '3 shifts active', hu: '3 műszak aktív', de: '3 Schichten aktiv' },
    delivered: { en: 'Delivered', hu: 'Leszállított', de: 'Geliefert' },
    deliveredVal: { en: '2,061 pcs', hu: '2,061 db', de: '2.061 Stk.' },
    deliveredSub: { en: '30,647 EUR · today', hu: '30,647 EUR · ma', de: '30.647 EUR · heute' },
    allocation: { en: 'Allocation', hu: 'Allokáció', de: 'Zuordnung' },
    allocationSub: { en: 'Weekly plan vs performance', hu: 'Heti terv vs teljesítés', de: 'Wochenplan vs Leistung' },
    prodTracking: { en: 'Production Tracking', hu: 'Termeléskövetés', de: 'Produktionsverfolgung' },
    prodTrackVal: { en: '⚠ 3 critical', hu: '⚠ 3 kritikus', de: '⚠ 3 kritisch' },
    prodTrackSub: { en: '5+ hour wait', hu: '5+ óra várakozás', de: '5+ Stunden Wartezeit' },
    operatorPerf: { en: 'Operator Performance', hu: 'Operátori Teljesítmény', de: 'Bedienerleistung' },
    operatorPerfVal: { en: '9 areas', hu: '9 terület', de: '9 Bereiche' },
    operatorPerfSub: { en: 'Assembly · Winding · Measuring', hu: 'Szerelés · Tekercselő · Mérő', de: 'Montage · Wickeln · Messen' },
    sapImport: { en: 'SAP Import', hu: 'SAP Import', de: 'SAP-Import' },
    sapImportSub: { en: 'rows processed', hu: 'sor feldolgozva', de: 'Zeilen verarbeitet' },
    warRoom: { en: 'War Room', hu: 'War Room', de: 'War Room' },
    warRoomVal: { en: 'Live', hu: 'Élő', de: 'Live' },
    warRoomSub: { en: 'Print ready', hu: 'Nyomtatásra kész', de: 'Druckbereit' },
    anomalyDetected: { en: 'Anomaly detected', hu: 'Anomália detektálva', de: 'Anomalie erkannt' },
    anomalySub: { en: 'Low performance week', hu: 'Alacsony teljesítmény hét', de: 'Leistungsschwache Woche' },

    // Chart
    minuteDeliveries: { en: '— MINUTE DELIVERIES —', hu: '— PERC LEADÁSOK —', de: '— MINUTEN-LIEFERUNGEN —' },
    dailyReport: { en: 'Daily report · 02.12 – 03.03', hu: 'Napi kimutatás · 02.12 – 03.03', de: 'Tagesbericht · 12.02 – 03.03' },
    anomalyDate: { en: 'Anomaly: 2026.02.15', hu: 'Anomália: 2026.02.15', de: 'Anomalie: 15.02.2026' },
    anomalyDesc: {
      en: 'Data was automatically aggregated → Shift A sick rate doubled.',
      hu: 'Az adatok automatikusan összevonódtak → A műszak táppénz rátája megkétszereződött.',
      de: 'Daten wurden automatisch aggregiert → Krankenrate der A-Schicht verdoppelt.',
    },

    // Forecast
    nextWeekForecast: { en: 'Next week forecast', hu: 'Következő hét előrejelzés', de: 'Nächste Woche Prognose' },
    incomingOrders: { en: '▲ Incoming orders', hu: '▲ Beérkező rendelések', de: '▲ Eingehende Aufträge' },
    incomingOrdersSub: { en: 'CW11 · next week demand', hu: 'CW11 · következő hét igény', de: 'KW11 · nächste Woche Bedarf' },
    incomingOrdersNote: { en: 'vs capacity: 82%', hu: 'vs kapacitás: 82%', de: 'vs Kapazität: 82%' },
    hcCalculator: { en: '⚠ HC Calculator', hu: '⚠ HC Kalkulátor', de: '⚠ HC Kalkulator' },
    hcVal: { en: '−8 ppl', hu: '−8 fő', de: '−8 Pers.' },
    hcSub: { en: 'Expected headcount shortage · C shift · Tuesday', hu: 'Várható létszámhiány · C műszak · kedd', de: 'Erwarteter Personalmangel · C-Schicht · Dienstag' },
    hcNote: { en: 'Order demand > available capacity', hu: 'Rendelési igény > elérhető kapacitás', de: 'Auftragsanforderung > verfügbare Kapazität' },
    headcountAlert: { en: 'Headcount Alert', hu: 'Létszám riasztás', de: 'Personalwarnung' },
    dailyTargetMin: { en: '◎ Daily target minutes', hu: '◎ Napi cél perc', de: '◎ Tages-Zielminuten' },
    dailyTargetSub: { en: 'fallback target · weekly not set', hu: 'fallback target · heti nincs beállítva', de: 'Fallback-Ziel · wöchentlich nicht gesetzt' },
    dailyTargetNote: { en: 'Available: 25,820 min (92.2%)', hu: 'Elérhető: 25,820 perc (92.2%)', de: 'Verfügbar: 25.820 Min. (92,2%)' },
    eurRevenue: { en: '€ EUR Revenue estimate', hu: '€ EUR Bevétel becslés', de: '€ EUR Umsatzschätzung' },
    eurSub: { en: 'Siemens DC + No Siemens + Edge winding', hu: 'Siemens DC + No Siemens + Él tekercselés', de: 'Siemens DC + No Siemens + Kantwicklung' },
    eurNote: { en: 'Based on previous week average', hu: 'Az előző hét átlagán alapul', de: 'Basierend auf dem Durchschnitt der Vorwoche' },

    // Resolution
    systemBalanced: { en: 'System balanced', hu: 'Rendszer egyensúlyban', de: 'System ausgeglichen' },
    tracking: { en: 'Tracking', hu: 'Követés', de: 'Verfolgung' },
    silenceNoise: { en: 'Silence the noise.', hu: 'Némítsd el a zajt.', de: 'Unterdrücke den Lärm.' },
    seeTheTruth: { en: 'See the truth.', hu: 'Lásd az igazat.', de: 'Sieh die Wahrheit.' },
    getInTouch: { en: 'Get in touch', hu: 'Kapcsolatfelvétel', de: 'Kontakt aufnehmen' },
  },
} as const;

export function t(obj: Record<Lang, string>, lang: Lang): string {
  return obj[lang] || obj.en;
}
