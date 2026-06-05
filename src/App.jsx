import { useState, useEffect, useMemo } from "react";
import "./App.css";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const isValidApiKey = (key) => typeof key === "string" && key.trim().length > 20 && !key.includes("your_openai_api_key") && !key.includes("your_anthropic_api_key") && !key.includes("your_gemini_api_key");
const GEMINI_KEY = isValidApiKey(GEMINI_API_KEY) ? GEMINI_API_KEY : null;
const AI_PROVIDER = GEMINI_KEY ? "Gemini" : null;

// ─── DUMMY DATA GENERATION ────────────────────────────────────────────────────

const indianCities = ["Mumbai","Delhi","Bengaluru","Hyderabad","Chennai","Pune","Kolkata","Ahmedabad","Jaipur","Lucknow","Chandigarh","Coimbatore","Kochi","Nagpur","Indore","Bhopal","Surat","Vadodara","Nashik","Visakhapatnam"];
const indianColleges = ["IIT Bombay","IIT Delhi","IIT Madras","IIM Ahmedabad","BITS Pilani","NIT Trichy","Delhi University","Jadavpur University","VIT Vellore","Manipal University","Symbiosis Pune","Christ University","NMIMS Mumbai","Anna University","Osmania University"];
const degrees = ["B.Tech","B.E.","MBA","B.Sc","M.Tech","B.Com","M.Sc","BCA","MCA","BA","LLB","MBBS","B.Arch","CA","B.Des"];
const companies = ["TCS","Infosys","Wipro","HCL","Tech Mahindra","Accenture","Cognizant","IBM","Google","Microsoft","Amazon","Flipkart","Zomato","Swiggy","HDFC Bank","ICICI Bank","Deloitte","EY","PwC","McKinsey","Byju's","Ola","Paytm","PhonePe","Zepto"];
const designations = ["Software Engineer","Senior Engineer","Product Manager","Data Scientist","Business Analyst","Consultant","Manager","Team Lead","Analyst","UX Designer","DevOps Engineer","Marketing Manager","Finance Analyst","HR Manager","Sales Executive"];
const religions = ["Hindu","Muslim","Christian","Sikh","Jain","Buddhist","Parsi"];
const castes = ["Brahmin","Kshatriya","Vaishya","Shudra","Kayastha","Rajput","Maratha","Nair","Reddy","Naidu","Lingayat","Patel","Jat","Yadav","Bania"];
const languages = ["Hindi","Telugu","Tamil","Kannada","Malayalam","Marathi","Bengali","Gujarati","Punjabi","Urdu","Odia","Assamese","English"];
const maleNames = ["Aarav","Arjun","Rohan","Vikram","Rahul","Karan","Aditya","Siddharth","Nikhil","Prateek","Varun","Ishan","Kabir","Dhruv","Yash","Aman","Akash","Vivek","Sameer","Tarun","Arnav","Dev","Rishi","Ankit","Kunal","Mihir","Neel","Raj","Harsh","Sourav","Ayaan","Zayan","Manish","Suresh","Ramesh","Naresh","Deepak","Sachin","Praveen","Manoj","Gaurav","Sandeep","Abhishek","Vishal","Girish","Pranav","Subhash","Vinay","Rajeev","Umesh"];
const femaleNames = ["Priya","Ananya","Kavya","Sneha","Pooja","Divya","Nisha","Riya","Aisha","Meera","Shreya","Lakshmi","Anika","Ishaan","Tanvi","Simran","Neha","Pallavi","Sonal","Vidya","Deepika","Sunita","Rekha","Poonam","Manjula","Sravani","Keerthi","Bhavana","Madhuri","Lavanya","Aparna","Suma","Jyothi","Usha","Varsha","Preeti","Amrita","Chetana","Dharani","Geetha","Harini","Indira","Jayanthi","Komal","Lalitha","Mamatha","Namrata","Omana","Padmaja","Qurata"];
const lastNames = ["Sharma","Patel","Singh","Kumar","Reddy","Nair","Iyer","Mehta","Joshi","Gupta","Verma","Mishra","Agarwal","Rao","Chopra","Pillai","Menon","Bose","Das","Sen","Malhotra","Kapoor","Saxena","Tiwari","Pandey","Srivastava","Bhatt","Shah","Chauhan","Yadav"];
const yesNoMaybe = ["Yes","No","Maybe"];

function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randLangs() {
  const n = randInt(1, 3);
  const shuffled = [...languages].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function generateProfile(id, gender) {
  const names = gender === "Male" ? maleNames : femaleNames;
  const firstName = rand(names);
  const lastName = rand(lastNames);
  const age = gender === "Male" ? randInt(24, 38) : randInt(21, 34);
  const dob = new Date(new Date().getFullYear() - age, randInt(0, 11), randInt(1, 28));
  const heightCm = gender === "Male" ? randInt(162, 185) : randInt(150, 172);
  const income = randInt(4, 40) * 100000;
  const statusOptions = ["Active","Matched","On Hold","New"];

  return {
    id,
    firstName,
    lastName,
    gender,
    dob: dob.toISOString().split("T")[0],
    age,
    country: "India",
    city: rand(indianCities),
    heightCm,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randInt(10,99)}@gmail.com`,
    phone: `+91 ${randInt(7,9)}${String(randInt(0,999999999)).padStart(9,"0")}`,
    college: rand(indianColleges),
    degree: rand(degrees),
    income,
    company: rand(companies),
    designation: rand(designations),
    maritalStatus: rand(["Single","Divorced","Widowed"]),
    languages: randLangs(),
    siblings: randInt(0, 3),
    caste: rand(castes),
    religion: rand(religions),
    wantKids: rand(yesNoMaybe),
    openToRelocate: rand(yesNoMaybe),
    openToPets: rand(yesNoMaybe),
    diet: rand(["Vegetarian","Non-Vegetarian","Eggetarian","Vegan"]),
    drinking: rand(["Never","Occasionally","Regularly"]),
    smoking: rand(["Never","Occasionally","Regularly"]),
    manglik: rand(["Yes","No","Doesn't Matter"]),
    complexion: rand(["Fair","Wheatish","Dark"]),
    familyType: rand(["Nuclear","Joint"]),
    fatherOccupation: rand(["Business","Service","Retired","Deceased"]),
    motherOccupation: rand(["Homemaker","Service","Business","Retired"]),
    hobbies: [rand(["Reading","Travelling","Cooking","Fitness","Music","Art","Gaming","Yoga","Swimming","Cycling"])],
    statusTag: rand(statusOptions),
    photo: `https://api.dicebear.com/7.x/notionists/svg?seed=${firstName}${id}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`,
  };
}

const MALE_CUSTOMERS = Array.from({ length: 15 }, (_, i) => generateProfile(i + 1, "Male"));
const FEMALE_CUSTOMERS = Array.from({ length: 15 }, (_, i) => generateProfile(i + 16, "Female"));
const ALL_CUSTOMERS = [...MALE_CUSTOMERS, ...FEMALE_CUSTOMERS];

// Pool of opposite gender profiles for matching
const MALE_POOL = Array.from({ length: 120 }, (_, i) => generateProfile(200 + i, "Male"));
const FEMALE_POOL = Array.from({ length: 120 }, (_, i) => generateProfile(300 + i, "Female"));

// ─── MATCHING LOGIC ───────────────────────────────────────────────────────────

function scoreMatch(customer, candidate) {
  let score = 0;
  const reasons = [];

  if (customer.gender === "Male") {
    // For male customers: match with women younger, earn less, shorter, matching views on kids
    const ageDiff = customer.age - candidate.age;
    if (ageDiff >= 0 && ageDiff <= 7) { score += 25; reasons.push(`Age compatible (${candidate.age} yrs)`); }
    else if (ageDiff > 7) { score += 10; }
    else { score -= 10; }

    if (candidate.income <= customer.income) { score += 20; reasons.push("Income compatible"); }
    else { score -= 5; }

    if (candidate.heightCm <= customer.heightCm) { score += 15; reasons.push("Height compatible"); }

    if (candidate.wantKids === customer.wantKids) { score += 20; reasons.push("Same views on children"); }
    else if (candidate.wantKids === "Maybe" || customer.wantKids === "Maybe") { score += 10; }

    if (candidate.religion === customer.religion) { score += 15; reasons.push("Same religion"); }
    if (candidate.caste === customer.caste) { score += 10; reasons.push("Same caste"); }
    if (candidate.city === customer.city) { score += 5; reasons.push("Same city"); }

  } else {
    // For female customers: profession compatibility, values, relocation preferences
    const proScore = professionCompatibility(customer.designation, candidate.designation);
    score += proScore;
    if (proScore > 15) reasons.push("Career compatible");

    if (candidate.openToRelocate === customer.openToRelocate || candidate.openToRelocate === "Yes") {
      score += 15; reasons.push("Relocation aligned");
    }

    if (candidate.openToPets === customer.openToPets) { score += 10; reasons.push("Pet preferences match"); }
    if (candidate.diet === customer.diet) { score += 10; reasons.push("Similar diet"); }
    if (candidate.wantKids === customer.wantKids) { score += 20; reasons.push("Same views on children"); }
    if (candidate.religion === customer.religion) { score += 15; reasons.push("Same religion"); }
    if (candidate.caste === customer.caste) { score += 10; reasons.push("Same caste"); }

    const ageDiff = candidate.age - customer.age;
    if (ageDiff >= 0 && ageDiff <= 5) { score += 15; reasons.push("Age compatible"); }
    else if (ageDiff > 5) { score += 5; }

    if (candidate.income >= customer.income) { score += 10; reasons.push("Income stable"); }
    if (candidate.city === customer.city) { score += 5; reasons.push("Same city"); }
    if (candidate.drinking === "Never" && customer.drinking === "Never") { score += 5; }
    if (candidate.smoking === "Never") { score += 5; }
  }

  // Normalize to 0–100
  const normalized = Math.min(100, Math.max(0, score));
  let tier = "Low Potential";
  if (normalized >= 75) tier = "High Potential";
  else if (normalized >= 50) tier = "Good Match";
  else if (normalized >= 30) tier = "Moderate Match";

  return { score: normalized, tier, reasons };
}

function professionCompatibility(d1, d2) {
  const techRoles = ["Software Engineer","Senior Engineer","Data Scientist","DevOps Engineer","UX Designer"];
  const mgmtRoles = ["Product Manager","Manager","Team Lead","Business Analyst","Consultant"];
  const financeRoles = ["Finance Analyst","CA"];
  const marketingRoles = ["Marketing Manager","Sales Executive","HR Manager","Analyst"];

  const getGroup = (d) => {
    if (techRoles.includes(d)) return "tech";
    if (mgmtRoles.includes(d)) return "mgmt";
    if (financeRoles.includes(d)) return "finance";
    return "other";
  };

  const g1 = getGroup(d1), g2 = getGroup(d2);
  if (g1 === g2) return 25;
  if ((g1 === "tech" && g2 === "mgmt") || (g2 === "tech" && g1 === "mgmt")) return 18;
  return 10;
}

function getMatches(customer) {
  const pool = customer.gender === "Male" ? FEMALE_POOL : MALE_POOL;
  return pool
    .map(candidate => ({ ...candidate, matchData: scoreMatch(customer, candidate) }))
    .sort((a, b) => b.matchData.score - a.matchData.score)
    .slice(0, 100);
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function fmt(n) { return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n); }
function fmtHeight(cm) { const ft = Math.floor(cm / 30.48); const inch = Math.round((cm / 30.48 - ft) * 12); return `${ft}'${inch}" (${cm} cm)`; }
function initials(first, last) { return (first[0] + last[0]).toUpperCase(); }
function tierColor(tier) {
  if (tier === "High Potential") return { bg: "#f5d0fe", text: "#7c3aed", border: "#c084fc" };
  if (tier === "Good Match") return { bg: "#fde2f8", text: "#9d174d", border: "#fb7185" };
  if (tier === "Moderate Match") return { bg: "#ffe4f0", text: "#be185d", border: "#fda4af" };
  return { bg: "#f3f0ff", text: "#5b21b6", border: "#ddd6fe" };
}
function statusColor(status) {
  if (status === "Active") return { bg: "#ede9fe", text: "#6d28d9" };
  if (status === "Matched") return { bg: "#fce7f3", text: "#be185d" };
  if (status === "On Hold") return { bg: "#fff1f2", text: "#9d174d" };
  return { bg: "#f7f3ff", text: "#5b21b6" };
}
const avatarColors = ["#F5D0FE","#FBCFE8","#E9D5FF","#FBCFE8","#F0ABFC","#FCE7F3"];
function avatarColor(id) { return avatarColors[id % avatarColors.length]; }

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function Avatar({ firstName, lastName, id, size = 44 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: avatarColor(id),
      display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 600, fontSize: size * 0.32, color: "#3f1850",
      flexShrink: 0, letterSpacing: 1
    }}>
      {initials(firstName, lastName)}
    </div>
  );
}

function Badge({ label, style }) {
  return (
    <span style={{
      display: "inline-block", padding: "2px 10px", borderRadius: 20,
      fontSize: 12, fontWeight: 600, ...style
    }}>{label}</span>
  );
}

function ScoreBar({ score }) {
  const color = score >= 75 ? "#db2777" : score >= 50 ? "#9333ea" : score >= 30 ? "#fb7185" : "#7c3aed";
  return (
    <div style={{ width: "100%", background: "#fdf2f8", borderRadius: 6, height: 8, overflow: "hidden" }}>
      <div style={{ width: `${score}%`, background: color, height: "100%", borderRadius: 6, transition: "width 0.6s ease" }} />
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────

function LoginPage({ onLogin, onBack }) {
  const [u, setU] = useState(""); const [p, setP] = useState(""); const [err, setErr] = useState("");
  const handle = () => {
    if (u === "matchmaker" && p === "tdc2024") { onLogin(); }
    else { setErr("Invalid credentials. Use: matchmaker / tdc2024"); }
  };
  return (
    <div className="login-shell">
      <div className="login-card" style={{ width: "100%", maxWidth: 1040, borderRadius: 32, overflow: "hidden", background: "#ffffff", boxShadow: "0 48px 140px rgba(79, 29, 119, 0.12)" }}>

        <div className="login-hero">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#7c3aed" }}>Back to Date Crew</div>
            <button onClick={onBack} style={{ padding: "10px 18px", borderRadius: 999, border: "1px solid rgba(124, 58, 237, 0.2)", background: "#fff", color: "#4c2b6a", fontWeight: 700, cursor: "pointer" }}>Home</button>
          </div>
          <div style={{ maxWidth: 560 }}>
            <span style={{ display: "inline-flex", alignItems: "center", padding: "10px 18px", borderRadius: 999, background: "rgba(147, 51, 234, 0.12)", color: "#7c3aed", fontWeight: 700, fontSize: 13, letterSpacing: "0.14em", marginBottom: 18 }}>Date Crew onboarding</span>
            <h1 style={{ margin: 0, fontSize: "clamp(2.4rem, 2.2vw, 3.4rem)", lineHeight: 1.03, color: "#24143f" }}>Welcome to The Date Crew</h1>
            <p style={{ margin: "24px 0 0", color: "#64517d", fontSize: 16, lineHeight: 1.8 }}>Welcome to The Date Crew — the premium matchmaking portal for serious singles. Secure access for matchmakers and clients with a refined, trusted experience.</p>
          </div>

          <div className="login-hero-stats">
            {[{ value: "18+", label: "Countries" }, { value: "1000+", label: "Successful Matches" }, { value: "85%", label: "Success Rate" }, { value: "4.9/5", label: "Client Satisfaction" }].map(item => (
              <div key={item.label} className="login-stat">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 36, borderRadius: 28, background: "#ffffff", border: "1px solid #f0e6ff", padding: "22px", boxShadow: "0 18px 34px rgba(147, 51, 234, 0.08)" }}>
            <div style={{ width: 84, height: 84, borderRadius: "50%", display: "grid", placeItems: "center", background: "rgba(147, 51, 234, 0.16)", color: "#7c3aed", fontSize: 34 }}>💍</div>
            <div>
              <strong style={{ display: "block", color: "#3f2761", fontSize: 16, marginBottom: 6 }}>Trusted by matchmakers</strong>
              <p style={{ margin: 0, color: "#64517d", fontSize: 14, lineHeight: 1.75 }}>A beautifully styled entry point for your matchmaking portal.</p>
            </div>
          </div>
        </div>

        <div className="login-panel">
          <div className="login-panel-heading">
            <div>
              <div className="login-pill">MATCHMAKER ACCESS</div>
              <h2 className="login-panel-title">Sign in securely</h2>
            </div>
            <div className="login-pill" style={{ background: "#f7efff", color: "#7c3aed" }}>Premium</div>
          </div>

          <div className="login-input-group">
            <label>Username or Email
              <input value={u} onChange={e => setU(e.target.value)} placeholder="matchmaker" onKeyDown={e => e.key === 'Enter' && handle()} />
            </label>
            <label>Password
              <input value={p} onChange={e => setP(e.target.value)} type="password" placeholder="••••••••" onKeyDown={e => e.key === 'Enter' && handle()} />
            </label>
          </div>

          {err && <div className="login-error">{err}</div>}

          <button onClick={handle} className="login-button">Sign In</button>

          <div className="login-footer">
            <span>Forgot password?</span>
            <a href="#">Need an account?</a>
          </div>

          <div className="login-demo">
            Demo credentials: <strong>matchmaker</strong> / <strong>tdc2024</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

function LandingPage({ onLoginClick }) {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, #9333ea, #ec4899)", display: "grid", placeItems: "center", color: "#fff", fontWeight: 800, fontSize: 18 }}>TDC</div>
          <div>
            <div style={{ fontSize: 24, fontWeight: 800 }}>TDC MatchHub</div>
            <div style={{ fontSize: 14, color: "#6d4b8a" }}>Smart Matching. Meaningful Connections.</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <a href="#who" style={{ color: "#4c2b6a", textDecoration: "none", fontWeight: 700 }}>About Us</a>
          <a href="#who" style={{ color: "#4c2b6a", textDecoration: "none", fontWeight: 700 }}>Blogs</a>
          <button onClick={onLoginClick} style={{ padding: "12px 24px", borderRadius: 999, background: "#fff", border: "1px solid rgba(124, 58, 237, 0.18)", color: "#4c2b6a", fontWeight: 700, cursor: "pointer" }}>Signup / Login</button>
        </div>
      </header>

      <main className="landing-main">
        <section className="landing-hero-section">
          <div>
            <div style={{ textTransform: "uppercase", color: "#9333ea", fontWeight: 700, letterSpacing: "0.16em", marginBottom: 18, fontSize: 13 }}>Ready to find your life partner?</div>
            <h1 style={{ margin: 0, fontSize: "clamp(3rem, 4vw, 4.8rem)", lineHeight: 1.02, color: "#24143f" }}>Find your person with the date crew.</h1>
            <p style={{ margin: "24px 0 0", color: "#5b4372", fontSize: 18, lineHeight: 1.8, maxWidth: 540 }}>No apps. No endless swiping. India’s #1 matchmakers helping serious singles meet someone real.</p>
            <button onClick={onLoginClick} style={{ marginTop: 32, padding: "16px 30px", borderRadius: 999, background: "linear-gradient(135deg, #9333ea, #ec4899)", border: "none", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>Signup / Login</button>

            <div className="landing-stats-grid">
              {[
                { value: "18+", label: "Countries" },
                { value: "1000+", label: "Successful Matches" },
                { value: "85%", label: "Success Rate" },
                { value: "4.9/5", label: "Client Satisfaction" },
              ].map(item => (
                <div key={item.label} className="landing-stat-card">
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#7c3aed" }}>{item.value}</div>
                  <div style={{ marginTop: 10, color: "#6b5783", fontSize: 14, lineHeight: 1.6 }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="landing-hero-image">
            <img
              src="https://www.lummi.ai/api/pro/image/eb048e93-c264-46c1-85ce-9d44d9f9e784?asset=original&cb=unHHih&auto=format&w=640"
              alt="Hero image"
            />
          </div>
        </section>

        <section id="who" className="landing-who-section">
          <div className="landing-preview-card">
            <div className="landing-preview-image">
              <img
                src="https://i.pinimg.com/736x/80/7e/48/807e48793abde7c871e3baaa697dedbf.jpg"
                alt="Matchmaking preview"
              />
            </div>
          </div>
          <div>
            <div style={{ textTransform: "uppercase", color: "#9333ea", fontWeight: 700, letterSpacing: "0.18em", fontSize: 13, marginBottom: 18 }}>Who we are?</div>
            <h2 style={{ margin: 0, fontSize: "2.6rem", lineHeight: 1.04, color: "#24143f" }}>We help you find the perfect partner for life.</h2>
            <p style={{ margin: "24px 0 0", color: "#544366", fontSize: 16, lineHeight: 1.8 }}>We are dedicated to helping individuals build meaningful and lasting relationships through personalized matchmaking. By combining verified profiles, thoughtful compatibility assessment, and a human-centered approach, we create connections that go beyond traditional dating platforms. Our mission is to make the journey toward finding the right partner more trusted, efficient, and meaningful.</p>
            <p style={{ margin: "18px 0 0", color: "#544366", fontSize: 16, lineHeight: 1.8 }}>Our platform leverages intelligent matching insights and detailed profile verification to ensure higher-quality connections. We strive to simplify the matchmaking journey while maintaining trust, privacy, and a personalized experience for every individual.</p>
          </div>
        </section>
      </main>

      <footer style={{ background: "#53094f", color: "#fff", padding: "48px 36px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <div style={{ width: 44, height: 44, borderRadius: 999, background: "#ec4899", display: "grid", placeItems: "center", color: "#fff", fontWeight: 800, fontSize: 18 }}>TDC</div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800 }}>TDC MatchHub</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.72)" }}>Handpicked · Verified · Private</div>
              </div>
            </div>
            <div style={{ display: "grid", gap: 14, color: "rgba(255,255,255,0.82)", fontSize: 14 }}>
              <div>📍 Connecting Meaningful Relationships Across 18+ Countries</div>
              <div>Info@tdcmatchhub.com</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 180 }}>
            <div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.72)", marginBottom: 18 }}>Connect with us</div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {['LinkedIn', 'Instagram', 'X', 'YouTube'].map(item => (
                  <span key={item} style={{ padding: "10px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.18)", fontSize: 13, color: "#fff" }}>{item}</span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", color: "rgba(255,255,255,0.82)", fontSize: 14 }}>
              <span>Team</span><span>Terms</span><span>Policy</span><span>FAQ's</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── CUSTOMER LIST ────────────────────────────────────────────────────────────

function CustomerRow({ c, onClick }) {
  const sc = statusColor(c.statusTag);
  return (
    <div onClick={() => onClick(c)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 20px", borderBottom: "1px solid #fde2f3", cursor: "pointer", transition: "background 0.15s" }}
      onMouseEnter={e => e.currentTarget.style.background = "#fff0f6"}
      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
      <Avatar firstName={c.firstName} lastName={c.lastName} id={c.id} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 15, color: "#4c2b55" }}>{c.firstName} {c.lastName}</div>
        <div style={{ fontSize: 13, color: "#9333ea" }}>{c.designation} · {c.company}</div>
      </div>
      <div style={{ fontSize: 13, color: "#9333ea", width: 40, textAlign: "center" }}>{c.age}</div>
      <div style={{ fontSize: 13, color: "#9333ea", width: 100, textAlign: "center" }}>{c.city}</div>
      <div style={{ fontSize: 13, color: "#9333ea", width: 80, textAlign: "center" }}>{c.maritalStatus}</div>
      <Badge label={c.statusTag} style={{ background: sc.bg, color: sc.text, width: 80, textAlign: "center" }} />
      <div style={{ fontSize: 13, color: "#db2777" }}>→</div>
    </div>
  );
}

function Dashboard({ onSelect }) {
  const [search, setSearch] = useState("");
  const [gFilter, setGFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = useMemo(() => ALL_CUSTOMERS.filter(c => {
    const q = search.toLowerCase();
    const nameMatch = `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) || c.city.toLowerCase().includes(q) || c.company.toLowerCase().includes(q);
    const gMatch = gFilter === "All" || c.gender === gFilter;
    const sMatch = statusFilter === "All" || c.statusTag === statusFilter;
    return nameMatch && gMatch && sMatch;
  }), [search, gFilter, statusFilter]);

  const stats = useMemo(() => ({
    total: ALL_CUSTOMERS.length,
    active: ALL_CUSTOMERS.filter(c => c.statusTag === "Active").length,
    matched: ALL_CUSTOMERS.filter(c => c.statusTag === "Matched").length,
    male: ALL_CUSTOMERS.filter(c => c.gender === "Male").length,
  }), []);

  const btnStyle = (active) => ({
    padding: "6px 16px", borderRadius: 20, border: "1.5px solid", fontSize: 13, fontWeight: 600, cursor: "pointer",
    background: active ? "#9333ea" : "transparent",
    color: active ? "#fff" : "#7c3aed",
    borderColor: "#c084fc",
  });

  return (
    <div style={{ padding: "28px 32px", fontFamily: "'Segoe UI',sans-serif" }}>
      <div style={{ marginBottom: 28 }}>
          <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 700, color: "#4c2b55" }}>Matchmaker Dashboard</h2>
          <p style={{ margin: 0, color: "#7c3aed", fontSize: 14 }}>Manage your clients and find their perfect match</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Total Clients", value: stats.total, color: "#7c3aed", bg: "#f3e8ff" },
          { label: "Active", value: stats.active, color: "#db2777", bg: "#ffe4f0" },
          { label: "Matched", value: stats.matched, color: "#d946ef", bg: "#f5d0fe" },
          { label: "Male / Female", value: `${stats.male} / ${stats.total - stats.male}`, color: "#ec4899", bg: "#fff0f6" },
        ].map(s => (
          <div key={s.label} style={{ background: s.bg, borderRadius: 14, padding: "18px 20px" }}>
            <div style={{ fontSize: 13, color: s.color, fontWeight: 600, marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#1c0d2f" }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search by name, city, company..." style={{ flex: 1, minWidth: 220, padding: "9px 14px", border: "1.5px solid #f3d6eb", borderRadius: 10, fontSize: 14, outline: "none", background: "#fff", color: "#1c0d2f", caretColor: "#9333ea" }} />
        <div style={{ display: "flex", gap: 6 }}>
          {["All","Male","Female"].map(g => <button key={g} onClick={() => setGFilter(g)} style={btnStyle(gFilter === g)}>{g}</button>)}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {['All','Active','Matched','On Hold','New'].map(s => <button key={s} onClick={() => setStatusFilter(s)} style={{ ...btnStyle(statusFilter === s), borderColor: "#c084fc", background: statusFilter === s ? "#c084fc" : "transparent", color: statusFilter === s ? "#fff" : "#7c3aed" }}>{s}</button>)}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f3d6eb", overflow: "hidden", boxShadow: "0 16px 40px rgba(160, 57, 212, 0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 20px", background: "#fff0f6", borderBottom: "1px solid #f3d6eb" }}>
          <div style={{ width: 44 }} />
          <div style={{ flex: 1, fontSize: 12, fontWeight: 700, color: "#7c3aed", textTransform: "uppercase", letterSpacing: 1 }}>Client</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#7c3aed", width: 40, textAlign: "center", textTransform: "uppercase", letterSpacing: 1 }}>Age</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#7c3aed", width: 100, textAlign: "center", textTransform: "uppercase", letterSpacing: 1 }}>City</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#7c3aed", width: 80, textAlign: "center", textTransform: "uppercase", letterSpacing: 1 }}>Status</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#7c3aed", width: 80, textAlign: "center", textTransform: "uppercase", letterSpacing: 1 }}>Stage</div>
          <div style={{ width: 20 }} />
        </div>
        {filtered.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#9333ea" }}>No clients found</div>
        ) : filtered.map(c => <CustomerRow key={c.id} c={c} onClick={onSelect} />)}
      </div>
      <p style={{ marginTop: 12, fontSize: 13, color: "#8b5cf6" }}>Showing {filtered.length} of {ALL_CUSTOMERS.length} clients</p>
    </div>
  );
}

// ─── MATCH CARD ───────────────────────────────────────────────────────────────

function MatchCard({ match, customer, onSendMatch }) {
  const tc = tierColor(match.matchData.tier);
  return (
    <div style={{ background: "#fff", border: "1px solid #f3d6eb", borderRadius: 14, padding: "16px 18px", marginBottom: 12, boxShadow: "0 14px 40px rgba(160, 57, 212, 0.06)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
        <Avatar firstName={match.firstName} lastName={match.lastName} id={match.id} size={40} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: "#4c2b55" }}>{match.firstName} {match.lastName}</div>
          <div style={{ fontSize: 13, color: "#7c3aed" }}>{match.designation} · {match.city}</div>
        </div>
        <Badge label={match.matchData.tier} style={{ background: tc.bg, color: tc.text, border: `1px solid ${tc.border}`, fontSize: 11, fontWeight: 700 }} />
      </div>

      <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#7c3aed", marginBottom: 10, flexWrap: "wrap" }}>
        <span>🎂 {match.age} yrs</span>
        <span>📏 {fmtHeight(match.heightCm)}</span>
        <span>💼 {fmt(match.income)}/yr</span>
        <span>🎓 {match.degree}</span>
        <span>🙏 {match.religion}</span>
      </div>

      <ScoreBar score={match.matchData.score} />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#9333ea", marginTop: 4, marginBottom: 10 }}>
        <span>Match Score</span>
        <span style={{ fontWeight: 700, color: "#4c2b55" }}>{match.matchData.score}%</span>
      </div>

      {match.matchData.reasons.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
          {match.matchData.reasons.slice(0, 4).map(r => (
            <span key={r} style={{ background: "#f0fdf4", color: "#166534", fontSize: 11, padding: "2px 8px", borderRadius: 12, fontWeight: 600 }}>✓ {r}</span>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => onSendMatch(match)} style={{ flex: 1, padding: "8px", background: "linear-gradient(135deg,#db2777,#9333ea)", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
          💌 Send Match
        </button>
        <button onClick={() => onSendMatch(match, true)} style={{ padding: "8px 14px", background: "#fff0f6", color: "#9333ea", border: "1.5px solid #f3d6eb", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
          ✨ AI Intro
        </button>
      </div>
    </div>
  );
}

// ─── AI INTRO MODAL ───────────────────────────────────────────────────────────

function AIIntroModal({ customer, match, onClose }) {
  const [intro, setIntro] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIntro("");
    setLoading(true);

    async function generate() {
      try {
        const reasons = match.matchData.reasons || [];
        const topReasons = reasons.slice(0, 3);
        const reasonSummary = topReasons.length > 0
          ? topReasons.length === 1
            ? topReasons[0]
            : `${topReasons.slice(0, -1).join(", ")} and ${topReasons.slice(-1)}`
          : "strong shared values";

        const score = match.matchData.score;
        const scoreLabel = score >= 75
          ? "a very strong fit"
          : score >= 50
            ? "a high-potential match"
            : "a promising connection";

        const ageNote = match.age === customer.age
          ? "at the same stage in life"
          : match.age > customer.age
            ? `who is ${match.age - customer.age} years older`
            : `who is ${customer.age - match.age} years younger`;

        const openers = [
          `I would like to introduce ${match.firstName} ${match.lastName}, a ${match.age}-year-old ${match.designation} from ${match.city}.`,
          `Meet ${match.firstName} ${match.lastName} — a ${match.designation} working at ${match.company} and based in ${match.city}.`,
          `${match.firstName} ${match.lastName} is a ${match.designation} from ${match.city} who stands out for ${reasonSummary}.`
        ];

        const bodies = [
          `They are ${ageNote} and ${scoreLabel} for ${customer.firstName} because of ${reasonSummary}.`,
          `With a match score of ${score}% and compatibility around ${reasonSummary}, they create a thoughtful pairing for ${customer.firstName}.`,
          `Their professional background and location make this introduction particularly relevant, and their compatibility is anchored by ${reasonSummary}.`
        ];

        const closings = [
          `Please let me know if you would like to explore this match further.`,
          `I’m happy to arrange a personal introduction when you are ready.`,
          `I believe ${match.firstName} could be an excellent fit for your client’s priorities.`
        ];

        const seed = `${customer.firstName}${match.firstName}${match.city}${match.age}${customer.age}${score}`;
        const hash = Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const choose = (items) => items[hash % items.length];

        const intro = `${choose(openers)} ${choose(bodies)} ${choose(closings)}`;
        setIntro(intro);
      } catch {
        setIntro(`Dear ${customer.firstName},\n\nIt was a pleasure reviewing ${match.firstName} ${match.lastName}, ${match.age} yrs, ${match.designation} at ${match.company}. Based on your shared values and compatibility, we believe this introduction may be a strong match and worth exploring further. Please let us know when you would like to arrange a personal introduction.\n\nWarmly,\nThe Date Crew Team`);
      }
      setLoading(false);
    }
    generate();
  }, [customer.id, match.id]);

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: "32px", maxWidth: 520, width: "90%", boxShadow: "0 32px 80px rgba(160, 57, 212, 0.14)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#4c2b55" }}>✨ AI-Generated Introduction</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#9333ea" }}>✕</button>
        </div>
        <div style={{ background: "#fff0f6", borderRadius: 12, padding: "20px", marginBottom: 20, minHeight: 120 }}>
          {loading ? (
            <div style={{ color: "#9333ea", fontSize: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 16, height: 16, border: "2px solid #f3d6eb", borderTopColor: "#9333ea", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                Crafting a personalized introduction...
              </div>
            </div>
          ) : (
            <p style={{ margin: 0, fontSize: 14, color: "#4c2b55", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{intro}</p>
          )}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => navigator.clipboard?.writeText(intro)} style={{ flex: 1, padding: "10px", background: "#fff0f6", color: "#9333ea", border: "1px solid #f3d6eb", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            📋 Copy
          </button>
          <button onClick={onClose} style={{ flex: 1, padding: "10px", background: "linear-gradient(135deg,#db2777,#9333ea)", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            Close
          </button>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── SEND MATCH MODAL ─────────────────────────────────────────────────────────

function SendMatchModal({ customer, match, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: "32px", maxWidth: 460, width: "90%", textAlign: "center", boxShadow: "0 30px 70px rgba(160, 57, 212, 0.12)" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>💌</div>
        <h3 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 700, color: "#4c2b55" }}>Match Sent!</h3>
        <p style={{ margin: "0 0 20px", color: "#7c3aed", fontSize: 14 }}>
          <strong>{match.firstName} {match.lastName}</strong> has been sent as a match suggestion to <strong>{customer.firstName} {customer.lastName}</strong>
        </p>
        <div style={{ background: "#fff0f6", borderRadius: 12, padding: "16px", marginBottom: 20, textAlign: "left", fontSize: 13 }}>
          <div style={{ color: "#9333ea", marginBottom: 4, fontWeight: 600 }}>📧 Mock Email Preview</div>
          <div><strong>To:</strong> {customer.email}</div>
          <div><strong>Subject:</strong> Exciting Match Suggestion from The Date Crew</div>
          <div style={{ marginTop: 10, color: "#4c2b55", lineHeight: 1.6 }}>
            Dear {customer.firstName}, we're excited to introduce you to {match.firstName} {match.lastName} ({match.age}, {match.designation}, {match.city}). 
            Match Score: <strong>{match.matchData.score}%</strong> — <em>{match.matchData.tier}</em>
          </div>
        </div>
        <button onClick={onClose} style={{ width: "100%", padding: "12px", background: "linear-gradient(135deg,#db2777,#9333ea)", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          Done
        </button>
      </div>
    </div>
  );
}

// ─── CUSTOMER DETAIL ──────────────────────────────────────────────────────────

function InfoRow({ label, value }) {
  if (!value) return null;
  return (
    <div style={{ display: "flex", padding: "10px 0", borderBottom: "1px solid #f3d6eb" }}>
      <div style={{ width: 170, fontSize: 13, color: "#9333ea", fontWeight: 600, flexShrink: 0 }}>{label}</div>
      <div style={{ fontSize: 14, color: "#4c2b55" }}>{value}</div>
    </div>
  );
}

function CustomerDetail({ customer, onBack }) {
  const [tab, setTab] = useState("profile");
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [sendModal, setSendModal] = useState(null);
  const [aiModal, setAiModal] = useState(null);
  const [matchPage, setMatchPage] = useState(1);
  const matches = useMemo(() => getMatches(customer), [customer.id]);
  const matchesPerPage = 12;
  const totalPages = Math.max(1, Math.ceil(matches.length / matchesPerPage));
  const visibleMatches = matches.slice((matchPage - 1) * matchesPerPage, matchPage * matchesPerPage);

  useEffect(() => setMatchPage(1), [customer.id]);

  useEffect(() => {
    const saved = localStorage.getItem(`tdc-notes-${customer.id}`);
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch {
        setNotes([]);
      }
    } else {
      setNotes([]);
    }
    setNote("");
  }, [customer.id]);

  useEffect(() => {
    localStorage.setItem(`tdc-notes-${customer.id}`, JSON.stringify(notes));
  }, [customer.id, notes]);

  const addNote = () => { if (note.trim()) { setNotes(n => [...n, { text: note, time: new Date().toLocaleString() }]); setNote(""); } };

  const tabStyle = (t) => ({
    padding: "8px 18px", borderRadius: 20, cursor: "pointer", fontSize: 14, fontWeight: 600, border: "none",
    background: tab === t ? "#9333ea" : "transparent",
    color: tab === t ? "#fff" : "#7c3aed",
  });

  return (
    <div style={{ padding: "24px 32px", fontFamily: "'Segoe UI',sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <button onClick={onBack} style={{ background: "#fff0f6", border: "1.5px solid #f3d6eb", borderRadius: 10, padding: "8px 14px", cursor: "pointer", fontSize: 14, color: "#6d28d9", fontWeight: 600 }}>
          ← Back
        </button>
        <Avatar firstName={customer.firstName} lastName={customer.lastName} id={customer.id} size={52} />
        <div>
          <h2 style={{ margin: "0 0 2px", fontSize: 22, fontWeight: 800, color: "#4c2b55" }}>{customer.firstName} {customer.lastName}</h2>
          <p style={{ margin: 0, color: "#9333ea", fontSize: 14 }}>{customer.designation} at {customer.company} · {customer.city}</p>
        </div>
        <Badge label={customer.statusTag} style={{ marginLeft: "auto", ...statusColor(customer.statusTag), padding: "6px 16px", fontSize: 13 }} />
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 24, background: "#fff0f6", padding: "6px", borderRadius: 14, width: "fit-content" }}>
        {["profile","matches","notes"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={tabStyle(t)}>
            {t === "profile" ? "👤 Profile" : t === "matches" ? `💞 Matches (${matches.length})` : "📝 Notes"}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {tab === "profile" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {[
            { title: "Personal Information", rows: [
              ["First Name", customer.firstName], ["Last Name", customer.lastName],
              ["Gender", customer.gender], ["Date of Birth", customer.dob],
              ["Age", `${customer.age} years`], ["Height", fmtHeight(customer.heightCm)],
              ["Marital Status", customer.maritalStatus], ["Complexion", customer.complexion],
            ]},
            { title: "Location", rows: [
              ["Country", customer.country], ["City", customer.city],
              ["Open to Relocate", customer.openToRelocate],
            ]},
            { title: "Contact", rows: [
              ["Email", customer.email], ["Phone", customer.phone],
            ]},
            { title: "Education & Career", rows: [
              ["College", customer.college], ["Degree", customer.degree],
              ["Company", customer.company], ["Designation", customer.designation],
              ["Annual Income", fmt(customer.income)],
            ]},
            { title: "Religion & Culture", rows: [
              ["Religion", customer.religion], ["Caste", customer.caste],
              ["Languages", customer.languages.join(", ")],
              ["Manglik", customer.manglik], ["Diet", customer.diet],
              ["Drinking", customer.drinking], ["Smoking", customer.smoking],
            ]},
            { title: "Family & Lifestyle", rows: [
              ["Family Type", customer.familyType],
              ["Siblings", customer.siblings], ["Father's Occupation", customer.fatherOccupation],
              ["Mother's Occupation", customer.motherOccupation],
              ["Want Kids", customer.wantKids], ["Open to Pets", customer.openToPets],
              ["Hobbies", customer.hobbies.join(", ")],
            ]},
          ].map(sec => (
            <div key={sec.title} style={{ background: "#fff", border: "1px solid #f3d6eb", borderRadius: 16, padding: "20px 24px" }}>
              <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 700, color: "#9333ea", textTransform: "uppercase", letterSpacing: 1 }}>{sec.title}</h4>
              {sec.rows.map(([l, v]) => <InfoRow key={l} label={l} value={String(v ?? "")} />)}
            </div>
          ))}
        </div>
      )}

      {/* Matches Tab */}
      {tab === "matches" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
            <p style={{ margin: 0, color: "#9333ea", fontSize: 14 }}>
              Showing {visibleMatches.length} of {matches.length} top matches from a pool of {customer.gender === "Male" ? FEMALE_POOL.length : MALE_POOL.length} profiles, ranked by compatibility
            </p>
            <span style={{ color: "#7c3aed", fontSize: 14, fontWeight: 700 }}>{matches.length} available matches</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 16 }}>
            {visibleMatches.map(m => (
              <MatchCard key={m.id} match={m} customer={customer}
                onSendMatch={(m, ai) => ai ? setAiModal(m) : setSendModal(m)} />
            ))}
          </div>
          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
              <button onClick={() => setMatchPage(p => Math.max(1, p - 1))} disabled={matchPage === 1} style={{ padding: "10px 18px", borderRadius: 14, border: "1px solid #d8b4fe", background: matchPage === 1 ? "#f5f3ff" : "#9333ea", color: matchPage === 1 ? "#9f7aea" : "#fff", cursor: matchPage === 1 ? "not-allowed" : "pointer" }}>
                Previous
              </button>
              <div style={{ color: "#4c2b6a", fontWeight: 700 }}>Page {matchPage} of {totalPages}</div>
              <button onClick={() => setMatchPage(p => Math.min(totalPages, p + 1))} disabled={matchPage === totalPages} style={{ padding: "10px 18px", borderRadius: 14, border: "1px solid #d8b4fe", background: matchPage === totalPages ? "#f5f3ff" : "#9333ea", color: matchPage === totalPages ? "#9f7aea" : "#fff", cursor: matchPage === totalPages ? "not-allowed" : "pointer" }}>
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* Notes Tab */}
      {tab === "notes" && (
        <div style={{ maxWidth: 600 }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Add a note from your meeting or call..." style={{ flex: 1, padding: "12px 14px", border: "1.5px solid #f3d6eb", borderRadius: 12, fontSize: 14, resize: "vertical", minHeight: 80, outline: "none", fontFamily: "inherit", background: "#fff", color: "#1c0d2f", caretColor: "#9333ea" }} />
            <button onClick={addNote} style={{ padding: "0 20px", background: "#9333ea", color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", alignSelf: "stretch" }}>Save</button>
          </div>
          {notes.length === 0 ? (
            <div style={{ textAlign: "center", color: "#9333ea", padding: "40px" }}>No notes yet. Add your first note above.</div>
          ) : (
            notes.map((n, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #f3d6eb", borderRadius: 12, padding: "14px 18px", marginBottom: 10 }}>
                <p style={{ margin: "0 0 6px", fontSize: 14, color: "#4c2b55" }}>{n.text}</p>
                <p style={{ margin: 0, fontSize: 12, color: "#9333ea" }}>{n.time}</p>
              </div>
            ))
          )}
        </div>
      )}

      {sendModal && <SendMatchModal customer={customer} match={sendModal} onClose={() => setSendModal(null)} />}
      {aiModal && <AIIntroModal customer={customer} match={aiModal} onClose={() => setAiModal(null)} />}
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [selected, setSelected] = useState(null);

  if (!loggedIn) {
    return showLogin
      ? <LoginPage onLogin={() => setLoggedIn(true)} onBack={() => setShowLogin(false)} />
      : <LandingPage onLoginClick={() => setShowLogin(true)} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #fff5fb 0%, #fff0f6 45%, #fdf2f8 100%)", fontFamily: "'Segoe UI',sans-serif" }}>
      {/* Navbar */}
      <div style={{ background: "#fff8fc", borderBottom: "1px solid #f3d6eb", padding: "12px 32px", display: "flex", alignItems: "center", gap: 16, boxShadow: "0 8px 30px rgba(160, 57, 212, 0.08)" }}>
        <span style={{ fontSize: 22 }}>💍</span>
        <span style={{ fontSize: 17, fontWeight: 800, color: "#4c2b55" }}>The Date Crew</span>
        <span style={{ fontSize: 13, color: "#9333ea", marginLeft: 4 }}>Matchmaker Portal</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
          {selected && (
            <button onClick={() => setSelected(null)} style={{ padding: "6px 14px", background: "#fff0f6", border: "1px solid #f3d6eb", borderRadius: 8, fontSize: 13, cursor: "pointer", color: "#6d28d9" }}>
              ← Dashboard
            </button>
          )}
          <div style={{ background: "#f5d0fe", color: "#7c3aed", padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 700 }}>
            👤 Matchmaker
          </div>
        </div>
      </div>

      {AI_PROVIDER ? null : (
        <div style={{ background: "#fff1f2", color: "#991b1b", padding: "18px 32px", borderBottom: "1px solid #fecaca", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div>
            <strong>AI is disabled.</strong> Set `VITE_GEMINI_API_KEY` in a `.env` file and restart dev mode.
          </div>
          <div style={{ fontSize: 13, color: "#7c2d2d" }}>No AI provider configured.</div>
        </div>
      )}

      {selected
        ? <CustomerDetail customer={selected} onBack={() => setSelected(null)} />
        : <Dashboard onSelect={setSelected} />
      }
    </div>
  );
}
