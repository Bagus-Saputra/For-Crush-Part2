"use client";

import { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";

export default function SurprisePage() {
  const [isOpened, setIsOpened] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [noButtonClicked, setNoButtonClicked] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [clickCount, setClickCount] = useState(0);
  const [isNoButtonAnimating, setIsNoButtonAnimating] = useState(false);
  const [yesButtonCentered, setYesButtonCentered] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff6b9d", "#ffb6c1", "#ff69b4", "#ff1493"],
    });
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
    });
  };

  const moveButtonRandomly = () => {
    if (!noButtonRef.current) return;
    
    const buttonRect = noButtonRef.current.getBoundingClientRect();
    
    // Gunakan viewport boundaries agar button bisa bergerak keluar dari container
    const maxX = window.innerWidth - buttonRect.width;
    const maxY = window.innerHeight - buttonRect.height;
    
    const randomX = Math.random() * Math.max(maxX, 0);
    const randomY = Math.random() * Math.max(maxY, 0);
    
    setNoButtonPosition({ x: randomX, y: randomY });
  };

  const handleNoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    // Efek confetti kecil setiap diklik
    confetti({
      particleCount: 20,
      spread: 30,
      origin: { y: 0.8 },
      colors: ["#ff9999", "#ffcccc", "#ffb347"],
    });
    
    if (newCount >= 11) {
      // Klik ke-11: button hilang
      setIsNoButtonAnimating(true);
      setTimeout(() => {
        setNoButtonClicked(true);
        setIsNoButtonAnimating(false);
        // Setelah NO hilang, baru YES pindah ke tengah
        setYesButtonCentered(true);
        // Confetti besar
        confetti({
          particleCount: 100,
          spread: 60,
          origin: { y: 0.7 },
          colors: ["#ff6b9d", "#ffb6c1", "#ff69b4"],
        });
      }, 300);
    } else {
      // Belum 11x: pindah posisi
      moveButtonRandomly();
      if (noButtonRef.current) {
        noButtonRef.current.style.transform = "scale(0.95)";
        setTimeout(() => {
          if (noButtonRef.current) {
            noButtonRef.current.style.transform = "scale(1)";
          }
        }, 100);
      }
    }
  };

  const handleOpen = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsOpened(true);
      triggerConfetti();
      setIsAnimating(false);
    }, 500);
  };

  const handleYesClick = () => {
    triggerConfetti();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleWhatsappClick = () => {
    const phoneNumber = "6282251243618";
    const message = encodeURIComponent("Aku terima, Love u my bub <3");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank", "noopener,noreferrer");
  };

  // Reset state saat surat dibuka
  useEffect(() => {
    if (isOpened) {
      setNoButtonPosition({ x: 0, y: 0 });
      setClickCount(0);
      setNoButtonClicked(false);
      setYesButtonCentered(false);
      setIsNoButtonAnimating(false);
    }
  }, [isOpened]);

  return (
    <div style={styles.container}>
      {!isOpened && (
        <div style={styles.envelopeWrapper}>
          <div style={styles.envelope} onClick={handleOpen}>
            <div style={styles.envelopeBody}>
              <div style={styles.stamp}>💌</div>
              <div style={styles.address}>
                <p style={styles.toText}>To:</p>
                <p style={styles.name}>Suci Dwi Melati</p>
              </div>
            </div>
            <div style={{ ...styles.envelopeFlap, transform: isAnimating ? 'rotateX(180deg)' : 'rotateX(0)' }} />
          </div>
          <p style={styles.clickHint}>✨ Klik amplopnya untuk membuka ✨</p>
        </div>
      )}

      {isOpened && (
        <div style={styles.letterWrapper}>
          <div style={styles.letter}>
            <div style={styles.letterHeader} />
            
            <div style={styles.letterContent}>
              <button onClick={() => setIsOpened(false)} style={styles.closeButton}>
                ✕
              </button>

              <div style={styles.heartDecoration}>❤️</div>

              <h1 style={styles.title}>Untuk Suci Dwi Melati,</h1>

              <div style={styles.message}>
                <p style={styles.paragraph}>
                  Hii! Sebenarnya aku ingin ngomong ini, tapi selalu diam dan takut buat mengatakan ini. 
                  Makanya aku buat website kecil-kecilan ini sebagai cara paling berani yang bisa aku lakukan.
                </p>

                <p style={styles.paragraph}>
                  First-time secara tiba-tiba banget ngajak pacaran dan itu membuatku kaget dan bingung sambil berpikir
                  "ini orang kenapa tiba-tiba ngajak pacaran dan padahal dia gak tau riwayatku dulu di game ini"
                  sambil tertawa dan aku mencoba buat memberanikan diri untuk mengatakan iya berpacaran, kemudian 
                  belakangan ini aku masih kebingungan juga bagaimana cara menyikapi orang yang suka tiba-tiba moodswing,
                  kemudian dan yahh, akhirnya aku membuatkan web ini untuk kamu. aku gak tau cara membuktikan rasa cinta ini
                  tapi dengan membuat ini aku serius untuk lanjut ke hubungan pacaran, tapi maaf dengan sikapku yang kaku dan suka diem 
                  ini aku sedang pengen liat sikap dan tingkah lucumu itu hehehe, maaf yaa cok 🐒
                  . entah ini excited atau bukan, dan biasa aja atau bukan tapi pukimaklah capek aku bikin kata-kata serius anjeng
                </p>

                <p style={styles.paragraph}>
                  maaf yaa kalau ini tiba-tiba, tapi aku nggak mau terus-terusan jadi orang yang 
                  cuma bisa diam dari jauh. Jadi...
                </p>

                <div style={styles.confessionBox}>
                  <p style={styles.confessionText}>
                    Aku suka kamu. 💕
                    <br />
                    Mau nggak kita coba buat cerita bareng?
                  </p>
                </div>

                <p style={styles.note}>
                  *Tersenyum atau ketawa gapapa, yang penting kamu baca ini sampai habis*
                </p>
              </div>

              {/* Button container dengan posisi relative */}
              <div 
                ref={containerRef}
                style={{
                  ...styles.buttonContainer,
                  justifyContent: yesButtonCentered ? "center" : "center",
                }}
              >
                {/* Tombol YES */}
                <button
                  onClick={handleYesClick}
                  style={{
                    ...styles.yesButton,
                    transition: "all 0.5s cubic-bezier(0.34, 1.2, 0.64, 1)",
                    transform: yesButtonCentered ? "scale(1.1)" : "scale(1)",
                    boxShadow: yesButtonCentered ? "0 10px 30px rgba(236, 72, 153, 0.4)" : "none",
                    margin: yesButtonCentered ? "0 auto" : "0",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  💖 Iya, aku mau! 💖
                </button>
                
                {/* Tombol NO - hanya muncul jika belum di-click 11x */}
                {!noButtonClicked && clickCount < 11 && (
                  <div
                    style={{
                      transition: "all 0.2s ease",
                      ...(noButtonPosition.x !== 0 || noButtonPosition.y !== 0 ? {
                        position: "fixed",
                        left: noButtonPosition.x,
                        top: noButtonPosition.y,
                      } : {
                        position: "relative",
                      }),
                      zIndex: 2, // Tombol NO di DEPAN tombol YES
                    }}
                  >
                    <button
                      ref={noButtonRef}
                      onClick={handleNoClick}
                      style={{
                        ...styles.maybeButton,
                        transition: isNoButtonAnimating 
                          ? "all 0.3s ease-out" 
                          : "all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                        opacity: isNoButtonAnimating ? 0 : 1,
                        transform: isNoButtonAnimating ? "scale(0) rotate(180deg)" : "scale(1)",
                        pointerEvents: isNoButtonAnimating ? "none" : "auto",
                      }}
                    >
                      🙈 Aku pikir dulu {clickCount > 0 && clickCount < 11 && ``}
                    </button>
                  </div>
                )}
              </div>

              {/* Pesan lucu */}
              {!noButtonClicked && clickCount > 0 && clickCount < 11 && (
                <div style={styles.chasingMessage}>
                  <span style={styles.chasingEmoji}>🏃‍♂️💨</span>
                  <p style={styles.chasingText}>
                    Tombolnya kabur! Kejar lagi 😀
                  </p>
                </div>
              )}

              {noButtonClicked && (
                <div style={styles.forceMessage}>
                  <span style={styles.forceEmoji}>💕</span>
                  <p style={styles.forceText}>
                    Waduh kok hilang 🗿
                    <br />
                    <span style={styles.smallText}>*Wkwkwk*</span>
                  </p>
                </div>
              )}

              <p style={styles.signature}>
                From,
                <br />
                <span style={styles.signatureName}>Dino 💌</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>Yey! 💕</h2>
            <p style={styles.modalMessage}>
              Terimakasih ya udah mau nerima aku 😊
              <br />
              Aku janji bakal jadi yang terbaik buat kamu!
            </p>
            <div style={styles.modalHeart}>❤️ ❤️ ❤️</div>
            <button onClick={handleWhatsappClick} style={styles.modalButton}>
              Tekan disini buat pindah ke WhatsApp 😊
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          overflow-x: hidden;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(-10%); }
          50% { transform: translateY(0); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideIn {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 50%, #f3e5f5 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "clamp(12px, 3vw, 16px)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  envelopeWrapper: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  },
  envelope: {
    width: "100%",
    maxWidth: "320px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  envelopeBody: {
    backgroundColor: "#fef3c7",
    borderRadius: "8px",
    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
    minHeight: "140px",
    height: "auto",
    background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
    border: "2px solid #fbbf24",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "clamp(50px, 3vw, 50px)",
  },
  stamp: {
    position: "absolute",
    top: "clamp(6px, 2vw, 16px)",
    right: "clamp(6px, 2vw, 16px)",
    width: "clamp(36px, 8vw, 48px)",
    height: "clamp(40px, 10vw, 56px)",
    backgroundColor: "#f87171",
    border: "2px solid #dc2626",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "clamp(16px, 4vw, 24px)",
    transform: "rotate(12deg)",
  },
  address: {
    textAlign: "center" as const,
    width: "100%",
    overflow: "hidden",
  },
  toText: {
    color: "#4b5563",
    fontSize: "clamp(14px, 3.5vw, 18px)",
    marginBottom: "4px",
    fontFamily: "'Dancing Script', cursive",
    margin: 0,
  },
  name: {
    color: "#1f2937",
    fontSize: "clamp(12px, 3vw, 16px)",
    fontWeight: 600,
    borderBottom: "2px dashed #9ca3af",
    paddingBottom: "2px",
    paddingLeft: "clamp(8px, 2vw, 16px)",
    paddingRight: "clamp(8px, 2vw, 16px)",
    margin: 0,
    whiteSpace: "normal" as const,
    wordWrap: "break-word" as const,
  },
  envelopeFlap: {
    position: "relative",
    width: "100%",
    height: "80px",
    backgroundColor: "#fde68a",
    clipPath: "polygon(0% 0%, 50% 80%, 100% 0%)",
    transformOrigin: "top",
    transition: "transform 1s ease",
    marginTop: "-75px",
  },
  clickHint: {
    textAlign: "center" as const,
    marginTop: "clamp(14px, 3vw, 24px)",
    color: "#db2777",
    fontWeight: 500,
    fontSize: "clamp(12px, 3vw, 14px)",
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
  letterWrapper: {
    position: "relative",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  letter: {
    width: "100%",
    maxWidth: "360px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
    border: "2px solid #fbcfe8",
    overflow: "hidden",
  },
  letterHeader: {
    height: "8px",
    background: "linear-gradient(90deg, #f472b6, #fb7185, #f472b6)",
  },
  letterContent: {
    padding: "clamp(14px, 4vw, 28px)",
  },
  closeButton: {
    float: "right" as const,
    background: "none",
    border: "none",
    fontSize: "clamp(16px, 4vw, 18px)",
    color: "#9ca3af",
    cursor: "pointer",
    transition: "color 0.2s",
    padding: "4px 8px",
  },
  heartDecoration: {
    textAlign: "center" as const,
    fontSize: "clamp(28px, 7vw, 36px)",
    marginBottom: "clamp(12px, 3vw, 16px)",
    animation: "bounce 1s infinite",
  },
  title: {
    fontSize: "clamp(18px, 5vw, 26px)",
    fontFamily: "'Dancing Script', cursive",
    textAlign: "center" as const,
    color: "#db2777",
    marginBottom: "clamp(16px, 4vw, 24px)",
    fontWeight: 700,
  },
  message: {
    marginBottom: "clamp(16px, 4vw, 24px)",
  },
  paragraph: {
    color: "#4b5563",
    lineHeight: 1.6,
    marginBottom: "clamp(12px, 3vw, 16px)",
    textIndent: "clamp(12px, 3vw, 28px)",
    fontSize: "clamp(12px, 2.8vw, 14px)",
  },
  confessionBox: {
    backgroundColor: "#fce7f3",
    padding: "clamp(12px, 3vw, 16px)",
    borderRadius: "8px",
    textAlign: "center" as const,
    margin: "clamp(16px, 5vw, 24px) 0",
    border: "1px solid #fbcfe8",
  },
  confessionText: {
    fontSize: "clamp(14px, 3.5vw, 16px)",
    fontWeight: 600,
    color: "#be185d",
    lineHeight: 1.5,
  },
  note: {
    fontSize: "clamp(10px, 2.2vw, 11px)",
    color: "#6b7280",
    fontStyle: "italic",
    textAlign: "center" as const,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column" as const,
    position: "relative" as const,
    marginTop: "clamp(20px, 5vw, 32px)",
    minHeight: "100px",
    justifyContent: "center",
    alignItems: "center",
    gap: "clamp(10px, 3vw, 16px)",
  },
  yesButton: {
    padding: "clamp(10px, 2vw, 11px) clamp(18px, 3.5vw, 26px)",
    background: "linear-gradient(135deg, #ec4899, #f43f5e)",
    color: "white",
    border: "none",
    borderRadius: "9999px",
    fontWeight: 600,
    fontSize: "clamp(13px, 2.8vw, 15px)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(236, 72, 153, 0.3)",
  },
  maybeButton: {
    padding: "clamp(10px, 2vw, 11px) clamp(14px, 3vw, 22px)",
    backgroundColor: "#e5e7eb",
    color: "#4b5563",
    border: "none",
    borderRadius: "9999px",
    fontWeight: 600,
    fontSize: "clamp(11px, 2.3vw, 14px)",
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
  },
  chasingMessage: {
    marginTop: "clamp(12px, 3vw, 16px)",
    padding: "6px",
    textAlign: "center" as const,
    animation: "float 1s ease-in-out infinite",
  },
  chasingEmoji: {
    fontSize: "clamp(14px, 3.5vw, 18px)",
    display: "inline-block",
    marginRight: "6px",
  },
  chasingText: {
    fontSize: "clamp(10px, 2.2vw, 11px)",
    color: "#b45309",
    fontWeight: 500,
    display: "inline-block",
  },
  forceMessage: {
    marginTop: "clamp(12px, 3vw, 20px)",
    padding: "clamp(8px, 2vw, 12px)",
    backgroundColor: "#fef3c7",
    borderRadius: "12px",
    textAlign: "center" as const,
    animation: "float 2s ease-in-out infinite",
    border: "1px solid #fbbf24",
  },
  forceEmoji: {
    fontSize: "clamp(20px, 5vw, 28px)",
    display: "block",
    marginBottom: "clamp(4px, 1vw, 8px)",
  },
  forceText: {
    color: "#b45309",
    fontSize: "clamp(11px, 2.5vw, 13px)",
    fontWeight: 500,
  },
  smallText: {
    fontSize: "clamp(8px, 1.8vw, 10px)",
    color: "#d97706",
    fontStyle: "italic",
  },
  signature: {
    textAlign: "center" as const,
    marginTop: "clamp(16px, 4vw, 24px)",
    color: "#6b7280",
    fontSize: "clamp(11px, 2.8vw, 13px)",
  },
  signatureName: {
    fontFamily: "'Dancing Script', cursive",
    color: "#ec4899",
    fontSize: "clamp(13px, 3.5vw, 16px)",
  },
  modalOverlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(5px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    animation: "fadeIn 0.3s ease",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "clamp(18px, 4vw, 28px)",
    maxWidth: "360px",
    width: "90%",
    textAlign: "center" as const,
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
    animation: "slideIn 0.3s ease",
  },
  modalEmoji: {
    fontSize: "clamp(40px, 10vw, 56px)",
    marginBottom: "clamp(12px, 3vw, 16px)",
  },
  modalTitle: {
    fontSize: "clamp(18px, 5vw, 24px)",
    fontWeight: "bold",
    marginBottom: "clamp(12px, 3vw, 16px)",
    fontFamily: "'Dancing Script', cursive",
    color: "#db2777",
  },
  modalMessage: {
    fontSize: "clamp(13px, 3vw, 15px)",
    color: "#4b5563",
    lineHeight: 1.6,
    marginBottom: "clamp(12px, 3vw, 16px)",
  },
  modalHeart: {
    fontSize: "clamp(24px, 6vw, 32px)",
    marginBottom: "clamp(16px, 4vw, 24px)",
    letterSpacing: "clamp(4px, 1vw, 8px)",
  },
  modalButton: {
    padding: "clamp(9px, 1.8vw, 11px) clamp(14px, 3.5vw, 22px)",
    background: "linear-gradient(135deg, #ec4899, #f43f5e)",
    color: "white",
    border: "none",
    borderRadius: "9999px",
    fontSize: "clamp(12px, 2.8vw, 15px)",
    fontWeight: 600,
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
};
