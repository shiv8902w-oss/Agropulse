import { useState, useEffect, createContext, useContext } from "react";
import { Languages } from "lucide-react";
import "./Language.css";

/* ─────────────────────────────────────────────
   1. CONTEXT — wrap the whole app in <LanguageProvider>
   ───────────────────────────────────────────── */
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en"); // 'en' | 'hi'
  const toggleLanguage = () => setLanguage((l) => (l === "en" ? "hi" : "en"));
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

/* ─────────────────────────────────────────────
   2. TRANSLATION — Local Dictionary + MyMemory API fallback
   ───────────────────────────────────────────── */
const LOCAL_TRANSLATIONS = {
  // Navigation / System
  "Dashboard": "डैशबोर्ड",
  "Alerts": "अलर्ट",
  "Login": "लॉगिन",
  "LIVE FEED": "लाइव फीड",
  "The System": "प्रणाली",
  "Explore": "खोजें",
  "VIEW": "देखें",
  "Sensors Gallery": "सेंसर गैलरी",
  "Field Shell Jacket": "फील्ड शेल जैकेट",
  "Sensors induced in the system": "सिस्टम में शामिल सेंसर",

  // Stacked Cards - Tags
  "Microclimate": "सूक्ष्म जलवायु",
  "Soil Intelligence": "मृदा बुद्धिमत्ता",
  "Early Warning": "प्रारंभिक चेतावनी",
  "Infrastructure": "बुनियादी ढांचा",

  // Stacked Cards - Titles
  "Field-Level Weather Station": "क्षेत्र-स्तरीय मौसम स्टेशन",
  "Soil Spectra Analytics": "मृदा स्पेक्ट्रम विश्लेषण",
  "Localized Alert Engine": "स्थानीयकृत अलर्ट इंजन",
  "Connected Sensor Mesh": "कनेक्टेड सेंसर मेश",

  // Stacked Cards - Techs
  "Anemometer": "पवनवेगमापी",
  "Rain Gauge": "वर्षामापी",
  "Environmental Sensor": "पर्यावरण सेंसर",
  "Soil Spectra": "मृदा स्पेक्ट्रा",
  "NIR Sensing": "एनआईआर सेंसिंग",
  "Zone Mapping": "क्षेत्र मानचित्रण",
  "Predictive Models": "पूर्वानुमानित मॉडल",
  "SMS/Push Alerts": "एसएमएस/पुश अलर्ट",
  "Risk Scoring": "जोखिम स्कोरिंग",
  "BLE Node": "बीएलई नोड",
  "BLE Gateway": "बीएलई गेटवे",
  "Data Logger": "डेटा लॉगर",

  // Stacked Cards - Descriptions
  "Continuous monitoring of temperature, humidity, rainfall, wind speed, wind direction, and light intensity at the crop canopy level — powered by an ultrasonic anemometer, tipping-bucket rain gauge, and precision environmental sensors.":
    "फसल कैनोपी स्तर पर तापमान, आर्द्रता, वर्षा, हवा की गति, हवा की दिशा और प्रकाश की तीव्रता की निरंतर निगरानी — एक अल्ट्रासोनिक पवनवेगमापी, टिपिंग-बकेट वर्षामापी और सटीक पर्यावरण सेंसर द्वारा संचालित।",
  "Real-time soil condition profiling using near-infrared spectroscopy. Moisture, organic carbon, nutrient density, and pH mapped across every zone — turning invisible soil data into actionable fertility prescriptions.":
    "नियर-इंफ्रारेड स्पेक्ट्रोस्कोपी का उपयोग करके वास्तविक समय में मिट्टी की स्थिति का प्रोफाइलिंग। नमी, जैविक कार्बन, पोषक तत्व घनत्व, और पीएच प्रत्येक क्षेत्र में मैप किए गए — अदृश्य मिट्टी के डेटा को कार्रवाई योग्य उर्वरता नुस्खे में बदलते हैं।",
  "Threshold-driven alerts for heavy rainfall, heat stress, high winds, and unsuitable crop-spraying conditions. Predictive models correlate microclimate patterns with crop vulnerability windows to warn before damage occurs.":
    "भारी वर्षा, गर्मी के तनाव, तेज हवाओं और अनुपयुक्त छिड़काव स्थितियों के लिए सीमा-संचालित अलर्ट। पूर्वानुमानित मॉडल नुकसान होने से पहले चेतावनी देने के लिए फसल के संवेदनशील समय के साथ सूक्ष्म जलवायु पैटर्न को जोड़ते हैं।",
  "BLE nodes relay field data through a low-power gateway to a centralized data logger. Edge processing filters noise, compresses payloads, and ensures continuous uptime even in low-connectivity rural environments.":
    "बीएलई नोड्स कम बिजली वाले गेटवे के माध्यम से एक केंद्रीकृत डेटा लॉगर तक फील्ड डेटा रिले करते हैं। एज प्रोसेसिंग शोर को फ़िल्टर करती है, पेलोड को कंप्रेस करती है, और कम कनेक्टिविटी वाले ग्रामीण वातावरण में भी निरंतर अपटाइम सुनिश्चित करती है।",

  // Portal Hero
  "Field Station": "फील्ड स्टेशन",
  "Live sensor feed": "लाइव सेंसर फीड",
  "Nodes Online": "ऑनलाइन नोड्स",
  "all active": "सभी सक्रिय",
  "Microclimate Early-Warning": "सूक्ष्म जलवायु प्रारंभिक चेतावनी",
  "Field-level weather, soil, and crop intelligence — every signal your farm needs, in real time.":
    "क्षेत्र-स्तरीय मौसम, मिट्टी और फसल की जानकारी — वास्तविक समय में आपकी कृषि की ज़रूरत के हर सिग्नल।",
  "Alert Status": "अलर्ट स्थिति",
  "Clear": "सुरक्षित",
  "all zones": "सभी क्षेत्र",
  "Warnings": "चेतावनी",
  "0 active": "0 सक्रिय",
  "Scroll to open": "खोलने के लिए स्क्रॉल करें",

  // 3D Product Gallery Sensors (Eyebrows)
  "DHT22 Temperature Sensor": "DHT22 तापमान सेंसर",
  "ESP32 IoT Controller": "ESP32 IoT नियंत्रक",
  "Rain Sensor Module": "वर्षा सेंसर मॉड्यूल",
  "Ambient Light Sensor": "परिवेश प्रकाश सेंसर",
  "PIR Motion Sensor": "PIR मोशन सेंसर",
  "TFT Display Module": "TFT डिस्प्ले मॉड्यूल",

  // 3D Product Gallery Sensors (Descriptions)
  "The DHT22 is a low-cost digital temperature and humidity sensor. It uses a capacitive humidity sensor and a thermistor to measure the surrounding air, delivering calibrated digital output via a single-wire protocol — ideal for field-level environmental monitoring.":
    "DHT22 एक कम लागत वाला डिजिटल तापमान और आर्द्रता सेंसर है। यह आसपास की हवा को मापने के लिए एक कैपेसिटिव आर्द्रता सेंसर और एक थर्मिस्टर का उपयोग करता है, जो सिंगल-वायर प्रोटोकॉल के माध्यम से कैलिब्रेटेड डिजिटल आउटपुट देता है - क्षेत्र-स्तरीय पर्यावरण निगरानी के लिए आदर्श।",
  "The ESP32 is a low-power system on a chip microcontroller with integrated Wi-Fi and dual-mode Bluetooth. It serves as the primary controller for smart agricultural sensor nodes, handling data processing and wireless transmission.":
    "ESP32 एकीकृत वाई-फाई और डुअल-मोड ब्लूटूथ के साथ एक कम बिजली वाला सिस्टम ऑन चिप माइक्रोकंट्रोलर है। यह डेटा प्रोसेसिंग और वायरलेस ट्रांसमिशन को संभालते हुए स्मार्ट कृषि सेंसर नोड्स के लिए प्राथमिक नियंत्रक के रूप में कार्य करता है।",
  "The Rain Sensor Module is an easy-to-use water detection board. It functions as a rain detection switch when moisture falls on its sensor plate surface, allowing real-time weather monitoring for agricultural microclimates.":
    "वर्षा सेंसर मॉड्यूल एक उपयोग में आसान जल पहचान बोर्ड है। यह बारिश का पता लगाने वाले स्विच के रूप में कार्य करता है जब इसकी सेंसर प्लेट की सतह पर नमी गिरती है, जिससे कृषि सूक्ष्म जलवायु के लिए वास्तविक समय में मौसम की निगरानी हो पाती है।",
  "The Ambient Light Sensor Module measures illuminance levels in lux. It enables smart agricultural hubs to optimize artificial lighting, trigger automated shade controls, and monitor solar radiation intensity.":
    "परिवेश प्रकाश सेंसर मॉड्यूल लक्स में रोशनी के स्तर को मापता है। यह स्मार्ट कृषि केंद्रों को कृत्रिम प्रकाश को अनुकूलित करने, स्वचालित शेड नियंत्रण को ट्रिगर करने और सौर विकिरण की तीव्रता की निगरानी करने में सक्षम बनाता है।",
  "The Passive Infrared (PIR) Motion Sensor detects animal and human motion by measuring changes in infrared energy. Integrated into solar-powered field hubs, it provides real-time security alerts and activity logging in agricultural zones.":
    "पैसिव इन्फ्रारेड (PIR) मोशन सेंसर इन्फ्रारेड ऊर्जा में बदलावों को मापकर जानवरों और मनुष्यों की गति का पता लगाता है। सौर-संचालित फील्ड हब में एकीकृत, यह कृषि क्षेत्रों में वास्तविक समय में सुरक्षा अलर्ट और गतिविधि लॉगिंग प्रदान करता है।",
  "The TFT Display Module provides high-resolution graphical output for field sensor telemetry, displaying real-time microclimate metrics, system diagnostic logs, and network status.":
    "TFT डिस्प्ले मॉड्यूल फील्ड सेंसर टेलीमेट्री के लिए उच्च-रिज़ॉल्यूशन ग्राफिकल आउटपुट प्रदान करता है, जो वास्तविक समय सूक्ष्म जलवायु मेट्रिक्स, सिस्टम नैदानिक लॉग और नेटवर्क स्थिति प्रदर्शित करता है।",

  // Dashboard Overview
  "Overview": "अवलोकन",
  "Sensors": "सेंसर",
  "Reports": "रिपोर्ट",
  "Last 7 days": "पिछले 7 दिन",
  "Field Overview": "क्षेत्र अवलोकन",
  "SENSOR ANALYTICS": "सेंसर विश्लेषण",
  "UPDATED 4 MIN AGO": "4 मिनट पहले अपडेट किया गया",
  "Day": "दिन",
  "Week": "सप्ताह",
  "Month": "महीना",
  "Export": "निर्यात करें",
  "+ Add Widget": "+ विजेट जोड़ें",
  "AVG TEMPERATURE": "औसत तापमान",
  "ACTIVE SENSORS": "सक्रिय सेंसर",
  "AVG SOIL MOISTURE": "औसत मृदा नमी",
  "Live Sensor Feed": "लाइव सेंसर फीड",
  "SENSOR DISTRIBUTION": "सेंसर वितरण",
  "SENSORS": "सेंसर",
  "FIELD HEALTH SCORE": "फील्ड स्वास्थ्य स्कोर",
  "Good": "अच्छा",
  "Zone Status": "जोन की स्थिति",
  "View all": "सभी देखें",

  // Dashboard Table & Chart labels
  "Zone": "जोन",
  "Temp": "तापमान",
  "Humidity": "आर्द्रता",
  "Wind": "हवा",
  "7-Day Trend": "7-दिवसीय रुझान",
  "Environmental": "पर्यावरणीय",

  // Feed Items
  "Wind alert: Zone A-3 gusts 38km/h": "पवन अलर्ट: जोन A-3 में हवा की गति 38 किमी/घंटा",
  "Soil moisture critical: Zone B-1": "मृदा नमी गंभीर: जोन B-1",
  "Temperature normal: all zones": "तापमान सामान्य: सभी जोन",
  "Rainfall detected: 3.2mm/hr": "वर्षा दर्ज: 3.2 मिमी/घंटा",
  "Soil spectra scan complete": "मृदा स्पेक्ट्रा स्कैन पूरा हुआ",
  "Heat stress warning cleared": "गर्मी के तनाव की चेतावनी समाप्त",

  // Times
  "Just now": "अभी-अभी",
  "2m ago": "2 मिनट पहले",
  "5m ago": "5 मिनट पहले",
  "8m ago": "8 मिनट पहले",
  "14m ago": "14 मिनट पहले",
  "22m ago": "22 मिनट पहले",
};

const translationCache = new Map();

async function translateText(text, targetLang) {
  if (!text || typeof text !== "string" || !text.trim()) return text;

  // 1. Check local static dictionary first
  if (targetLang === "hi" && LOCAL_TRANSLATIONS[text]) {
    return LOCAL_TRANSLATIONS[text];
  }

  // 2. Fallback to cache or API
  const cacheKey = `${targetLang}:${text}`;
  if (translationCache.has(cacheKey)) return translationCache.get(cacheKey);

  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text
      )}&langpair=en|${targetLang}`
    );
    const data = await res.json();
    const translated = data?.responseData?.translatedText || text;
    translationCache.set(cacheKey, translated);
    return translated;
  } catch {
    return text; // graceful fallback
  }
}

/* ─────────────────────────────────────────────
   3. HOOK — re-translates when language changes
   ───────────────────────────────────────────── */
export function useTranslated(text) {
  const { language } = useLanguage();
  const [translated, setTranslated] = useState(text);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (language === "en") {
      setTranslated(text);
      setLoading(false);
      return;
    }
    setLoading(true);
    translateText(text, language).then((result) => {
      if (!cancelled) {
        setTranslated(result);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [text, language]);

  return { text: translated, loading };
}

/* ─────────────────────────────────────────────
   4. DROP-IN WRAPPER — wrap any English string:
      <T>Add to cart</T>
   ───────────────────────────────────────────── */
export function T({ children }) {
  // If children is not a simple string (e.g. nested elements or translation is skipped),
  // handle it gracefully
  if (typeof children !== "string") {
    return <span>{children}</span>;
  }
  const { text, loading } = useTranslated(children);
  return <span className={`lang-t${loading ? " lang-t--loading" : ""}`}>{text}</span>;
}

/* ─────────────────────────────────────────────
   5. TOGGLE BUTTON — place anywhere (navbar, header…)
   ───────────────────────────────────────────── */
export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  return (
    <button
      onClick={toggleLanguage}
      className="lang-toggle"
      aria-label={`Switch to ${language === "en" ? "Hindi" : "English"}`}
    >
      <Languages className="lang-toggle-icon" size={15} />
      <span className={`lang-label${language === "en" ? " lang-label--active" : ""}`}>
        EN
      </span>
      <span className="lang-divider">/</span>
      <span className={`lang-label${language === "hi" ? " lang-label--active" : ""}`}>
        हि
      </span>
    </button>
  );
}
