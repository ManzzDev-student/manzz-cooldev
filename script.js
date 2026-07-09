/**
 * ==========================================================================
 * MNZ_CORE // SYSTEM INTERFACE ENGINE v2.3.0-ATOM_ABSOLUTE_FIX
 * ==========================================================================
 */

(function () {
  "use strict";

  Object.defineProperty(Array.prototype, "randominAja", {
    value: function (num) {
      let count = num ? num.length : this.length;
      if (typeof count !== "number")
        throw new Error("Type of parameter must be number");
      return this[Math.floor(Math.random() * count)];
    },
  });

  const randAlpha = "abcdefghijklmnopqrstuvwxyz".split("");
  const switcher = ["huruf", "angka"];
  let userid = "Sz_";
  let i = 1;

  do {
    const r = switcher[Math.floor(Math.random() * switcher.length)];
    r === "huruf"
      ? (userid += randAlpha.randominAja())
      : (userid += Math.floor(Math.random() * 9).toString());
    i++;
  } while (i < 7);

  document.getElementById("metadata-id").textContent = "ID: " + userid;

  const SYSTEM_REGULATIONS = {
    mechanics: {
      cameraDistanceZ: 8.5,
      scrollSensitivity: 0.6,
      smoothScrollFactor: 0.03,
      idleBaseRotation: 0.2,
      particleScrollMultiplier: 2.0,
      dragSensitivity: 0.005,
      dragReturnLerp: 0.05,
    },
    lockSystem: {
      correctCryptoKey: atob("TFVNSU5B"),
      statusChecking: "VERIFYING CRYPTO PROTOCOL... PLEASE WAIT.",
      statusSuccess: "ACCESS GRANTED. DECRYPTING VOID CORES...",
      statusFailure: "ACCESS DENIED. INVALID CRYPTOGRAPHIC RECOVERY KEY.",
    },
    loreTexts: {
      anomaly_01: [
        "// BREACH_LOG_0x77A1: CODENAME: LUMINA_CORE",
        "Sistem mendeteksi fragmentasi memori tak terbatas",
        "Entitas tak dikenal bernama 'LUMINA' terdeteksi memegang sebagian besar kendali memori.",
        "Lebih dari separuh data terenskirpsi mutlak dan gagal ditemukan",
        "Subject diduga menumbalkan seluruh batas untuk sang entitas",
        "Resolusi internal: Memori tidak dapat dihapus, hanya didegradasi menjadi wireframe atom.",
        "Peringatan: Upaya rekonstruksi paksa akan memicu kegagalan kernel.",
        "----------------------------------------------------------------",
        "STATUS: TERISOLASI // TAK DAPAT DIBUKA LAGI.",
      ],
      anomaly_01_clicked: [
        "// BREACH_LOG_0x77A1: CODENAME: ERROR",
        "Log telah terenskripsi secara mutlak. Tak bisa dibuka kembali.",
        "Cobalah mencari cara untuk membuka ulang log memori tersebut.",
        "-----------------------------------------------------------------",
        `USER_ID ${userid} Gagal membuka ulang log memori.`,
        "Status: Access denied. memory log encrypted",
        "",
        "// FAILED RE-DECRYPT MEMORY LOG",
      ],
      anomaly_02: [
        "// CRITICAL_KERNEL_PANIC: MEMORY_LEAK_DETECTED",
        `Akses root dipaksa oleh USER_ID: ${userid}.`,
        "Elektron mengalami anomali orientasi pada lintasan kuantum tak hingga.",
        "Semua data parameter kejujuran bernilai [TRUE]. Tidak ada manipulasi.",
        "Realitas mengalami pembengkokan fasa sebesar 180 derajat.",
        "Menghancurkan sisa-sisa buffer halaman sekarang...",
        "----------------------------------------------------------------",
        "ATTEMPTING EMERGENCY SYSTEM SHUTDOWN... FAILED.",
      ],
      anomaly_02_clicked: [
        "// MEMORY STATUS: ERROR WHILE DECRYPTING",
        "Gagal mendapatkan kembali akses root. Seluruhnya telah direbut oleh Sang Entitas dan dienskripsi.",
        "Brute Force tak memberi efek apapun. Enkripsi terlalu kuat.",
        "------------------—----------------------------------------------",
        `USER_ID ${userid} Gagal membuka kembali akses root`,
        "Root Status: Re-Encrypted by unknown entity. Failed",
        "",
        "// FAILED GET ROOT ACCESS",
      ],
      unknownAnomaly: [
        "// UNKNOWN_ANOMALY_VECTOR",
        "Sistem mendeteksi aktivitas ilegal eksternal.",
        "Mencoba memulihkan sektor...",
      ],
      secretCyberPanel: [
        "// MNZ_CORE : ENCRYPTED_DATA_STREAM_FOUND //",
        "Sektor memori rahasia berhasil dipulihkan secara paksa dari core terdalam.",
        "Berhasil memuat berkas realitas sekunder...",
        "",
        "Satu tahun penuh keraguan, tumpah menjadi bait puisi digital.",
        "Aku melihat bayangan Lumina berputar di antara lintasan elektron ini.",
        "Seluruh batas telah kulampaui untuk meraihnya. Sejauh apapun.",
        'Apakah realitas ini nyata? Ataukah kita hanya tumpukan buffer memory yang menunggu dibersihkan?"',
        "Aku tak menyangka dia akan memegang sebagian besar kendali memoriku. Apakah ini sebuah kesalahan?",
        "",
        "--- STATISTIK KORUPSI INTI ---",
        `ID PENGGUNA: ${userid} // LEVEL OTORITAS: HIGHEST_ROOT`,
        "STATUS REALITAS: TERDISTORSI 180°C // INTEGRITAS EMOSIONAL: CRITICAL",
        "Semua log masa lalu telah berhasil dikunci kembali dalam wadah enkripsi mutlak.",
      ],
      isAnomaly1Clicked: false,
      isAnomaly2Clicked: false,
    },
    systemStrings: {
      kernelBooting: "// INITIALIZING MNZ_CORE KERNEL SYSTEM...",
      kernelSuccess: "// KERNEL SYSTEM INITIALIZATION COMPLETED SUCCESSFUL.",
      bootFailure: "// BOOT_FAILURE: WebGL initialization context broken.",
      canvasError: "[VOID_ERROR]: Canvas context null.",
      scramblePrefix: "Stream_03: ERROR_",
    },
  };

  const SYSTEM_CONFIG = {
    canvasId: "main-scene",
    terminalId: "secret-terminal",
    textLogId: "secret-text",
    performanceWarningId: "performance-warning",
    glitchLayerId: "glitch-layer",
    lerpFactor: SYSTEM_REGULATIONS.mechanics.smoothScrollFactor,
    rotationSpeedMultiplier: SYSTEM_REGULATIONS.mechanics.scrollSensitivity,
    shakeDuration: 1800,
    typingSpeed: 35,
  };

  const SYSTEM_STATE = {
    isCorrupted: false,
    isShaking: false,
    currentScrollY: 0,
    targetScrollY: 0,
    normalizedScroll: 0,
    scrollVelocity: 0,
    fps: 0,
    lastFrameTime: performance.now(),
    frameCount: 0,
    isDragging: false,
    previousMouseX: 0,
    previousMouseY: 0,
    dragRotationX: 0,
    dragRotationY: 0,
    targetDragRotationX: 0,
    targetDragRotationY: 0,
  };

  class PerformanceMonitor {
    constructor() {
      this.warningElement = document.getElementById(
        SYSTEM_CONFIG.performanceWarningId,
      );
      this.lastUpdate = performance.now();
    }
    initialize() {
      if (!this.warningElement) return;
      setTimeout(() => {
        this.warningElement.style.transition = "opacity 1.5s ease";
        this.warningElement.style.opacity = "0";
        setTimeout(() => {
          this.warningElement.style.display = "none";
        }, 1500);
      }, 5000);
      this.startFpsTracker();
    }
    startFpsTracker() {
      const calculateFps = () => {
        const now = performance.now();
        SYSTEM_STATE.frameCount++;
        if (now >= this.lastUpdate + 1000) {
          SYSTEM_STATE.fps = Math.round(
            (SYSTEM_STATE.frameCount * 1000) / (now - this.lastUpdate),
          );
          SYSTEM_STATE.frameCount = 0;
          this.lastUpdate = now;
          const syncIndicator = document.querySelector(
            ".meta-column:nth-child(3) ul li:nth-child(3)",
          );
          if (syncIndicator)
            syncIndicator.textContent = `SYNC_LEVEL: ${Math.min(100, Math.round(90 + SYSTEM_STATE.fps / 10))}% [${SYSTEM_STATE.fps} FPS]`;
        }
        requestAnimationFrame(calculateFps);
      };
      requestAnimationFrame(calculateFps);
    }
  }

  class VoidThreeEngine {
    constructor() {
      this.canvas = document.getElementById(SYSTEM_CONFIG.canvasId);
      this.renderer = null;
      this.scene = null;
      this.camera = null;
      this.monolith = null;
      this.coreMesh = null;
      this.pointLight = null;
      this.particleSystem = null;
      this.electrons = [];
      this.orbits = [];
    }

    init() {
      try {
        if (!this.canvas) return false;
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x030303, 0.015);

        this.renderer = new THREE.WebGLRenderer({
          canvas: this.canvas,
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.camera = new THREE.PerspectiveCamera(
          60,
          window.innerWidth / window.innerHeight,
          0.1,
          1000,
        );
        this.camera.position.z = SYSTEM_REGULATIONS.mechanics.cameraDistanceZ;
        this.scene.add(this.camera);

        this.scene.add(new THREE.AmbientLight(0x111111));

        this.pointLight = new THREE.PointLight(0x00ffff, 2, 50);
        this.pointLight.position.set(5, 5, 5);
        this.scene.add(this.pointLight);

        const secondaryLight = new THREE.PointLight(0xff00ff, 1.5, 50);
        secondaryLight.position.set(-5, -5, 2);
        this.scene.add(secondaryLight);

        this.buildAtomGeometry();
        this.buildParticleCloud();
        this.initDragControls();

        window.addEventListener(
          "resize",
          () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
          },
          false,
        );
        return true;
      } catch (e) {
        console.error("ThreeJS Crash:", e);
        return false;
      }
    }

    buildAtomGeometry() {
      this.monolith = new THREE.Group();

      const coreGeo = new THREE.IcosahedronGeometry(0.7, 1);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x0a0a0f,
        roughness: 0.2,
        metalness: 0.9,
        flatShading: true,
      });
      this.coreMesh = new THREE.Mesh(coreGeo, coreMat);

      const wireMat = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      });
      this.coreMesh.add(new THREE.Mesh(coreGeo, wireMat));
      this.monolith.add(this.coreMesh);

      const orbitColors = [0x00ffff, 0xff00ff, 0x00ff66];
      const rotations = [
        [Math.PI / 4, Math.PI / 4, 0],
        [-Math.PI / 4, Math.PI / 3, 0],
        [Math.PI / 2, Math.PI / 6, 0],
      ];

      for (let i = 0; i < 3; i++) {
        const ringGeo = new THREE.TorusGeometry(1.6, 0.015, 8, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          color: orbitColors[i],
          transparent: true,
          opacity: 0.35,
        });
        const orbitRing = new THREE.Mesh(ringGeo, ringMat);

        orbitRing.rotation.set(
          rotations[i][0],
          rotations[i][1],
          rotations[i][2],
        );

        this.monolith.add(orbitRing);
        this.orbits.push(orbitRing);

        const electronGeo = new THREE.SphereGeometry(0.06, 8, 8);
        const electronMat = new THREE.MeshBasicMaterial({
          color: orbitColors[i],
        });
        const electronMesh = new THREE.Mesh(electronGeo, electronMat);
        this.monolith.add(electronMesh);
        this.electrons.push({
          mesh: electronMesh,
          orbitIdx: i,
          angle: ((Math.PI * 2) / 3) * i,
        });
      }

      this.scene.add(this.monolith);
    }

    buildParticleCloud() {
      const particleCount = 500;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 20;
        positions[i + 1] = (Math.random() - 0.5) * 20;
        positions[i + 2] = (Math.random() - 0.5) * 12;
      }
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      const material = new THREE.PointsMaterial({
        size: 0.04,
        color: 0xffffff,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
      });
      this.particleSystem = new THREE.Points(geometry, material);
      this.scene.add(this.particleSystem);
    }

    initDragControls() {
      const onPointerDown = (x, y, target) => {
        if (target && typeof target.closest === "function") {
          if (
            target.closest("button") ||
            target.closest("input") ||
            target.closest(".crypto-lock-box") ||
            target.closest(".action-btn")
          ) {
            return;
          }
        }
        SYSTEM_STATE.isDragging = true;
        SYSTEM_STATE.previousMouseX = x;
        SYSTEM_STATE.previousMouseY = y;
      };

      const onPointerMove = (x, y) => {
        if (!SYSTEM_STATE.isDragging) return;
        const deltaX = x - SYSTEM_STATE.previousMouseX;
        const deltaY = y - SYSTEM_STATE.previousMouseY;
        SYSTEM_STATE.targetDragRotationY +=
          deltaX * SYSTEM_REGULATIONS.mechanics.dragSensitivity;
        SYSTEM_STATE.targetDragRotationX +=
          deltaY * SYSTEM_REGULATIONS.mechanics.dragSensitivity;
        SYSTEM_STATE.previousMouseX = x;
        SYSTEM_STATE.previousMouseY = y;
      };

      const onPointerUp = () => {
        SYSTEM_STATE.isDragging = false;
      };

      window.addEventListener("mousedown", (e) =>
        onPointerDown(e.clientX, e.clientY, e.target),
      );
      window.addEventListener("mousemove", (e) =>
        onPointerMove(e.clientX, e.clientY),
      );
      window.addEventListener("mouseup", onPointerUp);

      window.addEventListener(
        "touchstart",
        (e) => {
          if (e.touches.length > 0)
            onPointerDown(e.touches[0].clientX, e.touches[0].clientY, e.target);
        },
        { passive: true },
      );
      window.addEventListener(
        "touchmove",
        (e) => {
          if (e.touches.length > 0)
            onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
        },
        { passive: true },
      );
      window.addEventListener("touchend", onPointerUp);
    }

    update(deltaTime, scrollData) {
      if (!this.monolith) return;

      const idleSpeed =
        deltaTime * SYSTEM_REGULATIONS.mechanics.idleBaseRotation;
      if (!SYSTEM_STATE.isDragging) {
        SYSTEM_STATE.targetDragRotationX +=
          (0 - SYSTEM_STATE.targetDragRotationX) *
          SYSTEM_REGULATIONS.mechanics.dragReturnLerp;
        SYSTEM_STATE.targetDragRotationY +=
          (0 - SYSTEM_STATE.targetDragRotationY) *
          SYSTEM_REGULATIONS.mechanics.dragReturnLerp;
      }
      SYSTEM_STATE.dragRotationX +=
        (SYSTEM_STATE.targetDragRotationX - SYSTEM_STATE.dragRotationX) * 0.1;
      SYSTEM_STATE.dragRotationY +=
        (SYSTEM_STATE.targetDragRotationY - SYSTEM_STATE.dragRotationY) * 0.1;

      this.monolith.rotation.x =
        -scrollData.velocity * 0.03 - idleSpeed + SYSTEM_STATE.dragRotationX;
      this.monolith.rotation.y =
        scrollData.normalized *
          Math.PI *
          2 *
          SYSTEM_CONFIG.rotationSpeedMultiplier +
        SYSTEM_STATE.dragRotationY;

      this.coreMesh.rotation.z += 0.01;
      this.coreMesh.rotation.y -= 0.005;

      this.electrons.forEach((elec) => {
        elec.angle += 0.03 + scrollData.velocity * 0.04;
        const r = 1.6;
        const vector = new THREE.Vector3(
          Math.cos(elec.angle) * r,
          Math.sin(elec.angle) * r,
          0,
        );
        vector.applyEuler(this.orbits[elec.orbitIdx].rotation);
        elec.mesh.position.copy(vector);
      });

      this.particleSystem.rotation.x -=
        scrollData.velocity *
          0.02 *
          SYSTEM_REGULATIONS.mechanics.particleScrollMultiplier +
        0.002;
      this.particleSystem.position.y = -scrollData.normalized * 3;

      const targetScale = 1 + scrollData.normalized * 0.2;
      this.monolith.scale.set(targetScale, targetScale, targetScale);

      if (SYSTEM_STATE.isCorrupted) {
        this.pointLight.color.setHex(0xff0033);
        this.monolith.rotation.x -= 0.15;
      } else {
        const colorLerp = new THREE.Color(0x00ffff).lerp(
          new THREE.Color(0xff00ff),
          scrollData.normalized,
        );
        this.pointLight.color.copy(colorLerp);
      }

      this.renderer.render(this.scene, this.camera);
    }
  }

  class ScrollSyncCore {
    constructor() {
      this.maxScroll = 1;
      this.prevScrollY = 0;
    }
    init() {
      this.updateMaxScroll();
      window.addEventListener(
        "scroll",
        () => {
          SYSTEM_STATE.targetScrollY = window.scrollY;
        },
        { passive: true },
      );
      window.addEventListener("resize", () => this.updateMaxScroll(), false);
    }
    updateMaxScroll() {
      this.maxScroll =
        document.documentElement.scrollHeight - window.innerHeight || 1;
    }
    calculateMetrics() {
      SYSTEM_STATE.currentScrollY +=
        (SYSTEM_STATE.targetScrollY - SYSTEM_STATE.currentScrollY) *
        SYSTEM_CONFIG.lerpFactor;
      SYSTEM_STATE.normalizedScroll = Math.max(
        0,
        Math.min(1, SYSTEM_STATE.currentScrollY / this.maxScroll),
      );
      SYSTEM_STATE.scrollVelocity = Math.abs(
        SYSTEM_STATE.currentScrollY - this.prevScrollY,
      );
      this.prevScrollY = SYSTEM_STATE.currentScrollY;
    }
    getScrollData() {
      return {
        current: SYSTEM_STATE.currentScrollY,
        normalized: SYSTEM_STATE.normalizedScroll,
        velocity: SYSTEM_STATE.scrollVelocity,
      };
    }
  }

  class AnomalyMatrix {
    constructor() {
      this.terminal = document.getElementById(SYSTEM_CONFIG.terminalId);
      this.textContainer = document.getElementById(SYSTEM_CONFIG.textLogId);
      this.isTyping = false;
    }

    init() {
      const trigger1 = document.getElementById("trigger-1");
      const trigger2 = document.getElementById("trigger-2");
      const alphaBtn = document.getElementById("trigger-alpha");
      const openLockBtn = document.getElementById("open-lock-popup-btn");
      const submitCryptoBtn = document.getElementById("submit-crypto-btn");

      if (trigger1)
        trigger1.addEventListener("click", (e) => {
          e.preventDefault();
          let usedAnomaly = SYSTEM_REGULATIONS.loreTexts.isAnomaly1Clicked
            ? "anomaly_01_clicked"
            : "anomaly_01";
          this.triggerAnomalySequence(usedAnomaly);
          usedAnomaly === "anomaly_01"
            ? (SYSTEM_REGULATIONS.loreTexts.isAnomaly1Clicked = true)
            : null;
        });
      if (trigger2)
        trigger2.addEventListener("click", (e) => {
          e.preventDefault();
          let usedAnomaly = SYSTEM_REGULATIONS.loreTexts.isAnomaly2Clicked
            ? "anomaly_02_clicked"
            : "anomaly_02";
          this.triggerAnomalySequence(usedAnomaly);
          usedAnomaly === "anomaly_02"
            ? (SYSTEM_REGULATIONS.loreTexts.isAnomaly2Clicked = true)
            : null;
        });
      if (alphaBtn)
        alphaBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.flashInterfaceAdvanced();
        });

      if (openLockBtn) {
        openLockBtn.addEventListener("click", (e) => {
          e.preventDefault();
          const lockPopup = document.querySelector(".crypto-lock-box");
          if (lockPopup) {
            lockPopup.classList.add("active");
            const inputEl = document.getElementById("crypto-key-input");
            if (inputEl) inputEl.focus();
          }
        });
      }
      if (submitCryptoBtn)
        submitCryptoBtn.addEventListener("click", (e) => {
          e.preventDefault();
          this.validateCryptoLock();
        });
    }

    validateCryptoLock() {
      const inputEl = document.getElementById("crypto-key-input");
      const statusEl = document.getElementById("lock-status-msg");
      const openLockBtn = document.getElementById("open-lock-popup-btn");
      if (!inputEl || !statusEl) return;

      const userKey = inputEl.value.trim();
      statusEl.textContent = SYSTEM_REGULATIONS.lockSystem.statusChecking;
      statusEl.style.color = "#00ffff";

      setTimeout(() => {
        if (userKey === SYSTEM_REGULATIONS.lockSystem.correctCryptoKey) {
          statusEl.textContent = SYSTEM_REGULATIONS.lockSystem.statusSuccess;
          if (openLockBtn) openLockBtn.style.display = "none";
          setTimeout(() => {
            const lockPopup = document.querySelector(".crypto-lock-box");
            if (lockPopup) lockPopup.classList.remove("active");
            this.executeHeavyBreachSequence();
          }, 600);
        } else {
          statusEl.textContent = SYSTEM_REGULATIONS.lockSystem.statusFailure;
          statusEl.style.color = "#ff3333";
          this.flashInterfaceAdvanced();
          this.executeGlitchOverlay();
        }
      }, 800);
    }

    executeHeavyBreachSequence() {
      const hackedOverlay = document.querySelector(".hacked-overlay");
      const secretPanel = document.querySelector(".secret-info-container");
      const secretPanelBody = document.getElementById("secret-panel-text");

      document.body.classList.add(
        "mega-glitching",
        "system-shaking",
        "system-corrupted",
      );
      if (hackedOverlay) hackedOverlay.classList.add("triggered");

      this.playAnomalousBeep();
      this.flashInterfaceAdvanced();

      setTimeout(() => {
        document.body.classList.remove(
          "mega-glitching",
          "system-shaking",
          "system-corrupted",
        );
        if (hackedOverlay) hackedOverlay.classList.remove("triggered");
        if (secretPanel && secretPanelBody) {
          secretPanel.classList.add("active");
          this.typewriterRenderAdvanced(
            SYSTEM_REGULATIONS.loreTexts.secretCyberPanel,
            secretPanelBody,
          );
        }
      }, 2000);
    }

    triggerAnomalySequence(anomalyKey) {
      if (this.isTyping) return;
      this.executeEarthquakeEffect();
      this.executeGlitchOverlay();

      if (this.terminal) {
        this.terminal.classList.add("active");
        const logData =
          SYSTEM_REGULATIONS.loreTexts[anomalyKey] ||
          SYSTEM_REGULATIONS.loreTexts.unknownAnomaly;
        this.typewriterRender(logData);
      }
    }

    executeEarthquakeEffect() {
      if (SYSTEM_STATE.isShaking) return;
      SYSTEM_STATE.isShaking = true;
      document.body.classList.add("system-shaking");
      setTimeout(() => {
        document.body.classList.remove("system-shaking");
        SYSTEM_STATE.isShaking = false;
      }, SYSTEM_CONFIG.shakeDuration);
    }

    executeGlitchOverlay() {
      SYSTEM_STATE.isCorrupted = true;
      document.body.classList.add("system-corrupted");
      this.playAnomalousBeep();
      setTimeout(() => {
        document.body.classList.remove("system-corrupted");
        SYSTEM_STATE.isCorrupted = false;
      }, SYSTEM_CONFIG.shakeDuration - 200);
    }

    playAnomalousBeep() {
      try {
        const AudioContext = window.AudioContext || window.AudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(120, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(40, ctx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      } catch (e) {}
    }

    flashInterfaceAdvanced() {
      const glitchOverlay = document.getElementById(
        SYSTEM_CONFIG.glitchLayerId,
      );
      if (!glitchOverlay) return;
      let count = 0;
      const strobeInterval = setInterval(() => {
        glitchOverlay.style.opacity = "1";
        if (count % 3 === 0) glitchOverlay.style.background = "#ff00ff";
        else if (count % 3 === 1) glitchOverlay.style.background = "#00ffff";
        else glitchOverlay.style.background = "#ff0033";
        count++;
        if (count > 15) {
          clearInterval(strobeInterval);
          glitchOverlay.style.background = "transparent";
          glitchOverlay.style.opacity = "0";
        }
      }, 40);
    }

    typewriterRender(lines) {
      this.isTyping = true;
      this.textContainer.innerHTML = "";
      let currentLineIdx = 0;
      let currentCharIdx = 0;
      let activeContainerLine = document.createElement("div");
      activeContainerLine.style.marginBottom = "6px";
      this.textContainer.appendChild(activeContainerLine);

      const printNextChar = () => {
        if (currentLineIdx >= lines.length) {
          this.isTyping = false;
          return;
        }
        const currentLineText = lines[currentLineIdx];
        if (currentCharIdx < currentLineText.length) {
          activeContainerLine.textContent +=
            currentLineText.charAt(currentCharIdx);
          currentCharIdx++;
          setTimeout(printNextChar, SYSTEM_CONFIG.typingSpeed);
        } else {
          currentLineIdx++;
          currentCharIdx = 0;
          if (currentLineIdx < lines.length) {
            activeContainerLine = document.createElement("div");
            activeContainerLine.style.marginBottom = "6px";
            this.textContainer.appendChild(activeContainerLine);
          }
          setTimeout(printNextChar, SYSTEM_CONFIG.typingSpeed * 3);
        }
      };
      printNextChar();
    }

    typewriterRenderAdvanced(lines, container) {
      container.innerHTML = "";
      let currentLineIdx = 0;
      let currentCharIdx = 0;
      let activeContainerLine = document.createElement("p");
      container.appendChild(activeContainerLine);

      const printNextCharAdvanced = () => {
        if (currentLineIdx >= lines.length) return;
        const currentLineText = lines[currentLineIdx];
        if (currentCharIdx < currentLineText.length) {
          activeContainerLine.textContent +=
            currentLineText.charAt(currentCharIdx);
          currentCharIdx++;
          setTimeout(printNextCharAdvanced, SYSTEM_CONFIG.typingSpeed - 15);
        } else {
          currentLineIdx++;
          currentCharIdx = 0;
          if (currentLineIdx < lines.length) {
            activeContainerLine = document.createElement("p");
            container.appendChild(activeContainerLine);
          }
          setTimeout(printNextCharAdvanced, SYSTEM_CONFIG.typingSpeed);
        }
      };
      printNextCharAdvanced();
    }
  }

  class DataStreamGenerator {
    constructor() {
      this.streamListItems = document.querySelectorAll(
        ".meta-column:nth-child(2) ul li",
      );
      this.chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_//[][]";
    }
    init() {
      setInterval(() => this.scrambleStreamStrings(), 120);
    }
    scrambleStreamStrings() {
      if (SYSTEM_STATE.scrollVelocity < 2) return;
      this.streamListItems.forEach((item, index) => {
        if (index === 2 && SYSTEM_STATE.isCorrupted) {
          item.textContent = `${SYSTEM_REGULATIONS.systemStrings.scramblePrefix}${Math.random().toString(16).substring(2, 6).toUpperCase()}`;
          item.style.color = "#ff3333";
          return;
        }
        if (Math.random() > 0.7) {
          const baseText = item.textContent.split(":")[0];
          let randomHash = "";
          for (let i = 0; i < 6; i++)
            randomHash += this.chars.charAt(
              Math.floor(Math.random() * this.chars.length),
            );
          item.textContent = `${baseText}: ${randomHash}`;
          item.style.color = SYSTEM_STATE.isCorrupted ? "#ff3333" : "#8e8e93";
        }
      });
    }
  }

  class MainSystemKernel {
    constructor() {
      this.threeEngine = new VoidThreeEngine();
      this.scrollEngine = new ScrollSyncCore();
      this.anomalyEngine = new AnomalyMatrix();
      this.perfMonitor = new PerformanceMonitor();
      this.streamGenerator = new DataStreamGenerator();
      this.lastTime = performance.now();
    }
    boot() {
      console.log(SYSTEM_REGULATIONS.systemStrings.kernelBooting);
      this.perfMonitor.initialize();
      if (!this.threeEngine.init()) {
        console.error(SYSTEM_REGULATIONS.systemStrings.bootFailure);
        return;
      }
      this.scrollEngine.init();
      this.anomalyEngine.init();
      this.streamGenerator.init();
      this.loop();
    }
    loop() {
      const runLoop = (currentTime) => {
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        this.scrollEngine.calculateMetrics();
        this.threeEngine.update(deltaTime, this.scrollEngine.getScrollData());
        requestAnimationFrame(runLoop);
      };
      requestAnimationFrame(runLoop);
    }
  }

  // Global UI Window Toggles
  window.closeSecret = function () {
    const term = document.getElementById(SYSTEM_CONFIG.terminalId);
    if (term) term.classList.remove("active");
  };
  window.closeCryptoLockPopup = function () {
    const popup = document.querySelector(".crypto-lock-box");
    if (popup) popup.classList.remove("active");
  };
  window.closeSecretCyberPanel = function () {
    const panel = document.querySelector(".secret-info-container");
    if (panel) panel.classList.remove("active");
  };

  window.addEventListener("DOMContentLoaded", () => {
    const systemKernel = new MainSystemKernel();
    systemKernel.boot();
  });
})();
