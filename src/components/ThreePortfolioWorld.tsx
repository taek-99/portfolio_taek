"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import * as THREE from "three";

type KeyState = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
};

type DestinationId = "info" | "projects" | "awards" | "contact";

type Destination = {
  id: DestinationId;
  label: string;
  panelTitle: string;
  summary: string;
  details: Array<[string, string]>;
  color: string;
  roofColor: string;
  position: THREE.Vector3Tuple;
};

const destinations: Destination[] = [
  {
    id: "info",
    label: "내 정보",
    panelTitle: "About Me",
    summary: "사용자 흐름과 인터랙션을 설계하는 프론트엔드 개발자입니다.",
    details: [
      ["관심 분야", "Three.js, UX, 실시간 인터랙션"],
      ["주요 기술", "React, Next.js, TypeScript"],
      ["방향", "W 방향 왼쪽 집"],
    ],
    color: "#2563eb",
    roofColor: "#dc2626",
    position: [-8.5, 0, -12],
  },
  {
    id: "projects",
    label: "프로젝트",
    panelTitle: "Projects",
    summary: "진행한 프로젝트와 구현 경험을 둘러보는 공간입니다.",
    details: [
      ["대표 작업", "RetinaFit, Hairddae, See-Sun"],
      ["핵심 경험", "서비스 흐름 설계, 미디어 처리, 인터랙션"],
      ["방향", "W 방향 오른쪽 집"],
    ],
    color: "#0f766e",
    roofColor: "#0891b2",
    position: [8.5, 0, -12],
  },
  {
    id: "awards",
    label: "수상 이력",
    panelTitle: "Awards",
    summary: "수상 경력과 대외 성과를 정리할 공간입니다.",
    details: [
      ["구성", "상장, 발표 자료, 현장 사진"],
      ["표현", "트로피룸 형태로 확장 예정"],
      ["방향", "S 방향 왼쪽 집"],
    ],
    color: "#b45309",
    roofColor: "#f97316",
    position: [-8.5, 0, 13],
  },
  {
    id: "contact",
    label: "연락처",
    panelTitle: "Contact",
    summary: "메일, GitHub, 포트폴리오 링크를 안내할 공간입니다.",
    details: [
      ["목적", "연락 수단과 외부 링크 연결"],
      ["상호작용", "방명록 또는 메일 전송 공간으로 확장"],
      ["방향", "S 방향 오른쪽 집"],
    ],
    color: "#7c3aed",
    roofColor: "#a855f7",
    position: [8.5, 0, 13],
  },
];

function makeMaterial(color: string, roughness = 0.72) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness: 0.08,
  });
}

function makeCharacter() {
  const person = new THREE.Group();
  person.name = "portfolio-player";

  const skin = makeMaterial("#f2c8a2", 0.58);
  const jacket = makeMaterial("#1d4ed8", 0.64);
  const pants = makeMaterial("#111827", 0.7);
  const shoes = makeMaterial("#e5e7eb", 0.5);
  const accent = makeMaterial("#38bdf8", 0.45);

  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 0.58, 8, 18), jacket);
  torso.position.y = 1.18;
  person.add(torso);

  const chestLight = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.04, 0.03), accent);
  chestLight.position.set(0, 1.26, 0.265);
  person.add(chestLight);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 28, 18), skin);
  head.position.y = 1.73;
  person.add(head);

  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.225, 28, 12, 0, Math.PI * 2, 0, Math.PI * 0.54), makeMaterial("#111827", 0.82));
  hair.position.set(0, 1.79, 0);
  person.add(hair);

  const armGeometry = new THREE.CapsuleGeometry(0.055, 0.46, 6, 12);
  const leftArm = new THREE.Mesh(armGeometry, jacket);
  leftArm.position.set(-0.36, 1.2, 0);
  leftArm.rotation.z = 0.16;
  person.add(leftArm);

  const rightArm = new THREE.Mesh(armGeometry.clone(), jacket);
  rightArm.position.set(0.36, 1.2, 0);
  rightArm.rotation.z = -0.16;
  person.add(rightArm);

  const legGeometry = new THREE.CapsuleGeometry(0.075, 0.52, 6, 12);
  const leftLeg = new THREE.Mesh(legGeometry, pants);
  leftLeg.position.set(-0.12, 0.55, 0);
  person.add(leftLeg);

  const rightLeg = new THREE.Mesh(legGeometry.clone(), pants);
  rightLeg.position.set(0.12, 0.55, 0);
  person.add(rightLeg);

  const footGeometry = new THREE.BoxGeometry(0.17, 0.08, 0.32);
  const leftFoot = new THREE.Mesh(footGeometry, shoes);
  leftFoot.position.set(-0.12, 0.17, 0.08);
  person.add(leftFoot);

  const rightFoot = new THREE.Mesh(footGeometry.clone(), shoes);
  rightFoot.position.set(0.12, 0.17, 0.08);
  person.add(rightFoot);

  person.userData.parts = { leftArm, rightArm, leftLeg, rightLeg, leftFoot, rightFoot };
  return person;
}

function makeSignTexture(label: string, background: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 256;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas rendering context is not available.");
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = background;
  context.strokeStyle = "rgba(255, 255, 255, 0.62)";
  context.lineWidth = 10;
  context.beginPath();
  context.roundRect(28, 28, canvas.width - 56, canvas.height - 56, 38);
  context.fill();
  context.stroke();

  context.fillStyle = "#f8fafc";
  context.font = "800 92px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.shadowColor = "rgba(0, 0, 0, 0.38)";
  context.shadowBlur = 10;
  context.shadowOffsetY = 4;
  context.fillText(label, canvas.width / 2, canvas.height / 2 + 3);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function makeSignBoard(
  label: string,
  color: string,
  position: THREE.Vector3Tuple,
  rotationY: number,
  rotationZ: number,
) {
  const texture = makeSignTexture(label, color);
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    transparent: true,
    roughness: 0.58,
    metalness: 0.04,
    side: THREE.DoubleSide,
  });
  const board = new THREE.Mesh(new THREE.BoxGeometry(2.55, 0.52, 0.1), material);
  board.position.set(...position);
  board.rotation.y = rotationY;
  board.rotation.z = rotationZ;
  board.castShadow = true;
  board.receiveShadow = true;
  board.userData.texture = texture;
  return board;
}

function makeSeoulClock() {
  const clock = new THREE.Group();
  clock.name = "seoul-clock";
  clock.position.set(0, 3.34, 0.16);

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 256;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;

  const makePanel = (rotationY: number) => {
    const panel = new THREE.Group();
    panel.rotation.y = rotationY;
    panel.position.set(Math.sin(rotationY) * 0.52, 0, Math.cos(rotationY) * 0.52);

    const display = new THREE.Mesh(
      new THREE.BoxGeometry(2.1, 0.56, 0.08),
      new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.34,
        metalness: 0.08,
      }),
    );
    display.position.z = 0.12;
    display.castShadow = true;
    display.receiveShadow = true;
    display.userData.texture = texture;
    panel.add(display);

    const frame = new THREE.Mesh(
      new THREE.BoxGeometry(2.28, 0.72, 0.07),
      new THREE.MeshStandardMaterial({
        color: "#111827",
        roughness: 0.42,
        metalness: 0.16,
      }),
    );
    frame.position.z = 0.065;
    frame.castShadow = true;
    panel.add(frame);

    return panel;
  };

  clock.add(makePanel(0));
  clock.add(makePanel((Math.PI * 2) / 3));
  clock.add(makePanel((Math.PI * 4) / 3));

  clock.userData.canvas = canvas;
  clock.userData.texture = texture;
  clock.userData.lastSecond = -1;
  return clock;
}

function updateSeoulClock(seoulClock: THREE.Group) {
  const seoulTime = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const hours = seoulTime.getUTCHours();
  const minutes = seoulTime.getUTCMinutes();
  const seconds = seoulTime.getUTCSeconds();

  if (seoulClock.userData.lastSecond === seconds) {
    return;
  }

  seoulClock.userData.lastSecond = seconds;
  const canvas = seoulClock.userData.canvas as HTMLCanvasElement;
  const context = canvas.getContext("2d");
  const texture = seoulClock.userData.texture as THREE.CanvasTexture;

  if (!context) {
    return;
  }

  const timeText = [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#020617";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = "#22d3ee";
  context.lineWidth = 12;
  context.strokeRect(18, 18, canvas.width - 36, canvas.height - 36);
  context.fillStyle = "#67e8f9";
  context.font = "700 102px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.shadowColor = "#22d3ee";
  context.shadowBlur = 16;
  context.fillText(timeText, canvas.width / 2, 118);
  context.shadowBlur = 0;
  context.fillStyle = "#e0f2fe";
  context.font = "700 34px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  context.fillText("SEOUL", canvas.width / 2, 214);
  texture.needsUpdate = true;
}

function makeSignpost() {
  const signpost = new THREE.Group();
  signpost.name = "center-signpost";

  const wood = makeMaterial("#6b4226", 0.78);
  const metal = makeMaterial("#94a3b8", 0.48);

  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.14, 3.25, 18), wood);
  pole.position.y = 1.62;
  pole.castShadow = true;
  pole.receiveShadow = true;
  signpost.add(pole);

  const cap = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.38, 18), metal);
  cap.position.y = 3.12;
  cap.castShadow = true;
  signpost.add(cap);

  const clockSupport = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.07, 0.26, 14), wood);
  clockSupport.position.y = 3.3;
  clockSupport.castShadow = true;
  signpost.add(clockSupport);

  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.58, 0.16, 28), metal);
  base.position.y = 0.08;
  base.castShadow = true;
  base.receiveShadow = true;
  signpost.add(base);

  signpost.add(makeSignBoard("↖ 내 정보", "#2563eb", [-0.78, 2.85, -0.08], -0.58, -0.04));
  signpost.add(makeSignBoard("프로젝트 ↗", "#0f766e", [0.86, 2.32, -0.08], 0.58, 0.04));
  signpost.add(makeSignBoard("↙ 수상 이력", "#b45309", [-0.78, 1.79, 0.12], 0.58, -0.04));
  signpost.add(makeSignBoard("연락처 ↘", "#7c3aed", [0.86, 1.26, 0.12], -0.58, 0.04));
  signpost.add(makeSeoulClock());

  return signpost;
}

function makeDestinationHouse(destination: Destination) {
  const house = new THREE.Group();
  house.name = `${destination.id}-house`;
  house.position.set(...destination.position);

  const directionToCenter = new THREE.Vector3(
    -destination.position[0],
    0,
    -destination.position[2],
  ).normalize();
  house.rotation.y = Math.atan2(directionToCenter.x, directionToCenter.z);
  house.userData.entry = new THREE.Vector3(...destination.position).addScaledVector(directionToCenter, 2.15);

  const wall = makeMaterial("#e2e8f0", 0.82);
  const sideWall = makeMaterial("#cbd5e1", 0.86);
  const roofMaterial = makeMaterial(destination.roofColor, 0.68);
  const doorMaterial = makeMaterial("#7c2d12", 0.74);
  const windowMaterial = new THREE.MeshStandardMaterial({
    color: "#7dd3fc",
    emissive: "#155e75",
    emissiveIntensity: 0.28,
    roughness: 0.35,
    metalness: 0.05,
  });

  const body = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.45, 3.1), wall);
  body.position.y = 1.25;
  body.castShadow = true;
  body.receiveShadow = true;
  house.add(body);

  const sideAccent = new THREE.Mesh(new THREE.BoxGeometry(3.7, 2.5, 0.08), sideWall);
  sideAccent.position.set(0, 1.26, -1.59);
  sideAccent.receiveShadow = true;
  house.add(sideAccent);

  const roof = new THREE.Mesh(new THREE.ConeGeometry(2.85, 1.3, 4), roofMaterial);
  roof.position.y = 3.05;
  roof.rotation.y = Math.PI / 4;
  roof.castShadow = true;
  house.add(roof);

  const door = new THREE.Mesh(new THREE.BoxGeometry(0.86, 1.42, 0.08), doorMaterial);
  door.position.set(0, 0.74, 1.59);
  door.castShadow = true;
  house.add(door);

  const doorKnob = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 8), makeMaterial("#facc15", 0.42));
  doorKnob.position.set(0.28, 0.75, 1.64);
  doorKnob.castShadow = true;
  house.add(doorKnob);

  const leftWindow = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.58, 0.08), windowMaterial);
  leftWindow.position.set(-1.08, 1.52, 1.6);
  house.add(leftWindow);

  const rightWindow = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.58, 0.08), windowMaterial);
  rightWindow.position.set(1.08, 1.52, 1.6);
  house.add(rightWindow);

  const pathMaterial = new THREE.MeshStandardMaterial({
    color: "#8b5a2b",
    roughness: 0.96,
    metalness: 0.02,
  });
  const path = new THREE.Mesh(new THREE.PlaneGeometry(2.05, 5.4), pathMaterial);
  path.rotation.x = -Math.PI / 2;
  path.position.set(0, 0.018, 4);
  path.receiveShadow = true;
  house.add(path);

  const labelTexture = makeSignTexture(destination.label, destination.color);
  const label = new THREE.Mesh(
    new THREE.BoxGeometry(1.72, 0.36, 0.08),
    new THREE.MeshStandardMaterial({
      map: labelTexture,
      roughness: 0.58,
      metalness: 0.04,
    }),
  );
  label.position.set(0, 2.32, 1.64);
  label.userData.texture = labelTexture;
  house.add(label);

  return house;
}

function makeDirtPath(destination: Destination) {
  const plazaRadius = 2.32;
  const houseSetback = 2.48;
  const pathHalfWidth = 0.38;
  const end = new THREE.Vector3(destination.position[0], 0, destination.position[2]);
  const direction = end.clone().normalize();
  const start = direction.clone().multiplyScalar(plazaRadius - 0.04);
  const finish = end.clone().addScaledVector(direction, -houseSetback);
  const side = new THREE.Vector3(-direction.z, 0, direction.x).multiplyScalar(pathHalfWidth);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
      [
        start.x - side.x,
        0.026,
        start.z - side.z,
        start.x + side.x,
        0.026,
        start.z + side.z,
        finish.x + side.x,
        0.026,
        finish.z + side.z,
        finish.x - side.x,
        0.026,
        finish.z - side.z,
      ],
      3,
    ),
  );
  geometry.setIndex([0, 1, 2, 0, 2, 3]);
  geometry.computeVertexNormals();

  const path = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({
      color: "#8b5a2b",
      roughness: 0.96,
      metalness: 0.01,
    }),
  );

  path.receiveShadow = true;
  return path;
}

function makeCenterDirtPlaza() {
  const plaza = new THREE.Mesh(
    new THREE.CircleGeometry(2.35, 72),
    new THREE.MeshStandardMaterial({
      color: "#8b5a2b",
      roughness: 0.97,
      metalness: 0.01,
    }),
  );

  plaza.rotation.x = -Math.PI / 2;
  plaza.position.y = 0.03;
  plaza.receiveShadow = true;
  return plaza;
}

function makeSkyDome() {
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(78, 48, 24),
    new THREE.MeshBasicMaterial({
      color: "#6bb7ff",
      side: THREE.BackSide,
      fog: false,
    }),
  );

  sky.position.y = 8;
  return sky;
}

function makeSun() {
  const sun = new THREE.Group();
  sun.name = "sun";
  sun.position.set(18, 22, -28);

  const glow = new THREE.Mesh(
    new THREE.SphereGeometry(2.1, 32, 18),
    new THREE.MeshBasicMaterial({
      color: "#fde68a",
      transparent: true,
      opacity: 0.34,
      fog: false,
    }),
  );
  sun.add(glow);

  const core = new THREE.Mesh(
    new THREE.SphereGeometry(1.18, 32, 18),
    new THREE.MeshBasicMaterial({
      color: "#facc15",
      fog: false,
    }),
  );
  sun.add(core);

  return sun;
}

function makeMoon() {
  const moon = new THREE.Group();
  moon.name = "moon";
  moon.position.set(-18, 16, -26);

  const glow = new THREE.Mesh(
    new THREE.SphereGeometry(1.8, 32, 18),
    new THREE.MeshBasicMaterial({
      color: "#dbeafe",
      transparent: true,
      opacity: 0.22,
      fog: false,
    }),
  );
  moon.add(glow);

  const core = new THREE.Mesh(
    new THREE.SphereGeometry(0.92, 32, 18),
    new THREE.MeshBasicMaterial({
      color: "#e5e7eb",
      fog: false,
    }),
  );
  moon.add(core);

  const crescentCut = new THREE.Mesh(
    new THREE.SphereGeometry(0.88, 32, 18),
    new THREE.MeshBasicMaterial({
      color: "#0f172a",
      fog: false,
    }),
  );
  crescentCut.position.set(0.32, 0.06, 0.08);
  moon.add(crescentCut);

  return moon;
}

function updateSkyBySeoulTime(
  sky: THREE.Mesh,
  visualSun: THREE.Group,
  moon: THREE.Group,
  sunLight: THREE.DirectionalLight,
  ambient: THREE.HemisphereLight,
  scene: THREE.Scene,
) {
  const seoulTime = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const hour =
    seoulTime.getUTCHours() +
    seoulTime.getUTCMinutes() / 60 +
    seoulTime.getUTCSeconds() / 3600;
  const isDay = hour >= 6 && hour < 18;
  const isEvening = hour >= 17 && hour < 20;
  const isDawn = hour >= 5 && hour < 7;

  if (isDay) {
    const dayProgress = THREE.MathUtils.clamp((hour - 6) / 12, 0, 1);
    const angle = dayProgress * Math.PI;
    visualSun.position.set(-30 * Math.cos(angle), 7 + 24 * Math.sin(angle), -28);
    sunLight.position.copy(visualSun.position);
  } else {
    const nightProgress = hour >= 18 ? (hour - 18) / 12 : (hour + 6) / 12;
    const angle = THREE.MathUtils.clamp(nightProgress, 0, 1) * Math.PI;
    moon.position.set(-28 * Math.cos(angle), 8 + 18 * Math.sin(angle), -26);
    sunLight.position.copy(moon.position);
  }

  visualSun.visible = isDay || isDawn || isEvening;
  moon.visible = !isDay || isEvening;

  const skyColor = new THREE.Color(
    isDay
      ? isEvening || isDawn
        ? "#f59e72"
        : "#6bb7ff"
      : "#0f172a",
  );
  const fogColor = new THREE.Color(isDay ? (isEvening || isDawn ? "#fbbf77" : "#8bc5ff") : "#111827");
  const skyMaterial = sky.material as THREE.MeshBasicMaterial;
  skyMaterial.color.copy(skyColor);
  scene.background = skyColor;
  if (scene.fog instanceof THREE.Fog) {
    scene.fog.color.copy(fogColor);
  }

  sunLight.intensity = isDay ? (isEvening || isDawn ? 1.6 : 2.8) : 0.55;
  sunLight.color.set(isDay ? "#fff7d6" : "#c7d2fe");
  ambient.intensity = isDay ? 1.85 : 0.78;
  ambient.color.set(isDay ? "#f8fbff" : "#dbeafe");
  ambient.groundColor.set(isDay ? "#244f2d" : "#0f2b1d");
}

function makeCloud(position: THREE.Vector3Tuple, scale: number) {
  const cloud = new THREE.Group();
  cloud.position.set(...position);
  cloud.scale.setScalar(scale);

  const material = new THREE.MeshStandardMaterial({
    color: "#f8fafc",
    roughness: 0.72,
    metalness: 0,
    transparent: true,
    opacity: 0.92,
  });

  const puffs: Array<[number, number, number, number, number, number]> = [
    [-1.25, 0, 0, 1.05, 0.52, 0.62],
    [-0.45, 0.24, 0.02, 1.18, 0.66, 0.7],
    [0.38, 0.12, -0.02, 1.08, 0.54, 0.62],
    [1.14, -0.04, 0, 0.82, 0.42, 0.5],
  ];

  puffs.forEach(([x, y, z, sx, sy, sz]) => {
    const puff = new THREE.Mesh(new THREE.SphereGeometry(0.72, 20, 12), material);
    puff.position.set(x, y, z);
    puff.scale.set(sx, sy, sz);
    cloud.add(puff);
  });

  return cloud;
}

export function ThreePortfolioWorld() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [activeDestinationId, setActiveDestinationId] = useState<DestinationId | null>(null);
  const activeDestinationRef = useRef<DestinationId | null>(null);

  const updateActiveDestination = (value: DestinationId | null) => {
    if (activeDestinationRef.current === value) {
      return;
    }

    activeDestinationRef.current = value;
    setActiveDestinationId(value);
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#6bb7ff");
    scene.fog = new THREE.Fog("#8bc5ff", 34, 82);

    const camera = new THREE.PerspectiveCamera(46, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 4.2, 6.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.touchAction = "none";
    mount.appendChild(renderer.domElement);

    const sky = makeSkyDome();
    const visualSun = makeSun();
    const moon = makeMoon();
    scene.add(sky);
    scene.add(visualSun);
    scene.add(moon);
    const clouds = [
      [-22, 15, -30, 1.35],
      [-8, 18, -38, 1.05],
      [14, 16, -34, 1.25],
      [28, 13, -18, 0.9],
      [-24, 12, 8, 0.88],
    ].map(([x, y, z, scale], index) => {
      const cloud = makeCloud([x, y, z], scale);
      cloud.userData.baseY = y;
      cloud.userData.phase = index * 1.7;
      scene.add(cloud);
      return cloud;
    });

    const ambient = new THREE.HemisphereLight("#f8fbff", "#244f2d", 1.85);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight("#fff7d6", 2.8);
    sun.position.set(18, 22, -28);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -18;
    sun.shadow.camera.right = 18;
    sun.shadow.camera.top = 18;
    sun.shadow.camera.bottom = -18;
    scene.add(sun);
    updateSkyBySeoulTime(sky, visualSun, moon, sun, ambient, scene);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(90, 90, 1, 1),
      new THREE.MeshStandardMaterial({ color: "#244f2d", roughness: 0.94, metalness: 0.01 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const grid = new THREE.GridHelper(90, 90, "#7bbf66", "#376b3d");
    grid.position.y = 0.012;
    scene.add(grid);

    const horizon = new THREE.Mesh(
      new THREE.RingGeometry(15, 15.12, 128),
      new THREE.MeshBasicMaterial({ color: "#38bdf8", transparent: true, opacity: 0.38, side: THREE.DoubleSide }),
    );
    horizon.rotation.x = -Math.PI / 2;
    horizon.position.y = 0.04;
    scene.add(horizon);

    const markerMaterial = makeMaterial("#f8fafc", 0.5);
    for (let i = 0; i < 16; i += 1) {
      const angle = (i / 16) * Math.PI * 2;
      const marker = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 0.14), markerMaterial);
      marker.position.set(Math.cos(angle) * 10, 0.07, Math.sin(angle) * 10);
      marker.rotation.y = angle;
      marker.castShadow = true;
      scene.add(marker);
    }

    const destinationEntries = destinations.map((destination) => {
      scene.add(makeDirtPath(destination));

      const house = makeDestinationHouse(destination);
      scene.add(house);

      return {
        id: destination.id,
        entry: house.userData.entry as THREE.Vector3,
      };
    });

    scene.add(makeCenterDirtPlaza());

    const signpost = makeSignpost();
    signpost.position.set(0, 0, 0);
    scene.add(signpost);
    const seoulClock = signpost.getObjectByName("seoul-clock") as THREE.Group | undefined;
    if (seoulClock) {
      updateSeoulClock(seoulClock);
    }

    const person = makeCharacter();
    person.position.set(0, 0, 4.5);
    person.rotation.y = Math.PI;
    person.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    scene.add(person);

    const keyState: KeyState = {
      forward: false,
      backward: false,
      left: false,
      right: false,
    };

    const setKey = (code: string, value: boolean) => {
      if (code === "KeyW" || code === "ArrowUp") keyState.forward = value;
      if (code === "KeyS" || code === "ArrowDown") keyState.backward = value;
      if (code === "KeyA" || code === "ArrowLeft") keyState.left = value;
      if (code === "KeyD" || code === "ArrowRight") keyState.right = value;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      setKey(event.code, true);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setKey(event.code, false);
    };

    let isDraggingView = false;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let targetViewYaw = 0;
    let targetViewPitch = 0;
    let viewYaw = 0;
    let viewPitch = 0;

    const handlePointerDown = (event: PointerEvent) => {
      isDraggingView = true;
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
      renderer.domElement.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDraggingView) {
        return;
      }

      const deltaX = event.clientX - lastPointerX;
      const deltaY = lastPointerY - event.clientY;
      targetViewYaw = THREE.MathUtils.euclideanModulo(targetViewYaw - deltaX * 0.0035 + Math.PI, Math.PI * 2) - Math.PI;
      targetViewPitch = THREE.MathUtils.clamp(targetViewPitch + deltaY * 0.008, -0.35, 0.95);
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
    };

    const handlePointerUp = (event: PointerEvent) => {
      isDraggingView = false;

      if (renderer.domElement.hasPointerCapture(event.pointerId)) {
        renderer.domElement.releasePointerCapture(event.pointerId);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    renderer.domElement.addEventListener("pointerdown", handlePointerDown);
    renderer.domElement.addEventListener("pointermove", handlePointerMove);
    renderer.domElement.addEventListener("pointerup", handlePointerUp);
    renderer.domElement.addEventListener("pointercancel", handlePointerUp);

    const clock = new THREE.Clock();
    const moveVector = new THREE.Vector3();
    const inputVector = new THREE.Vector3();
    const cameraForward = new THREE.Vector3();
    const cameraRight = new THREE.Vector3();
    const cameraTarget = new THREE.Vector3();
    const lookTarget = new THREE.Vector3();
    const cameraOffset = new THREE.Vector3();
    const cameraOffsetBase = new THREE.Vector3(0, 4.2, 6.6);
    const lookOffset = new THREE.Vector3();
    const lookOffsetBase = new THREE.Vector3(0, 1.15, -2.2);
    let walkTime = 0;
    let frameId = 0;

    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.033);
      const yawDelta = THREE.MathUtils.euclideanModulo(targetViewYaw - viewYaw + Math.PI, Math.PI * 2) - Math.PI;
      viewYaw += yawDelta * (1 - Math.pow(0.002, delta));
      viewPitch = THREE.MathUtils.lerp(viewPitch, targetViewPitch, 1 - Math.pow(0.002, delta));
      inputVector.set(0, 0, 0);

      if (keyState.forward) inputVector.z -= 1;
      if (keyState.backward) inputVector.z += 1;
      if (keyState.left) inputVector.x -= 1;
      if (keyState.right) inputVector.x += 1;

      const isMoving = inputVector.lengthSq() > 0;
      if (isMoving) {
        inputVector.normalize();
        cameraForward.set(-Math.sin(viewYaw), 0, -Math.cos(viewYaw));
        cameraRight.set(Math.cos(viewYaw), 0, -Math.sin(viewYaw));
        moveVector
          .copy(cameraRight)
          .multiplyScalar(inputVector.x)
          .addScaledVector(cameraForward, -inputVector.z)
          .normalize();
        person.position.addScaledVector(moveVector, delta * 4.25);
        person.position.x = THREE.MathUtils.clamp(person.position.x, -34, 34);
        person.position.z = THREE.MathUtils.clamp(person.position.z, -34, 34);

        const targetRotation = Math.atan2(moveVector.x, moveVector.z);
        const rotationDelta = THREE.MathUtils.euclideanModulo(targetRotation - person.rotation.y + Math.PI, Math.PI * 2) - Math.PI;
        person.rotation.y += rotationDelta * (1 - Math.pow(0.001, delta));
        walkTime += delta * 11;
      } else {
        walkTime += delta * 3;
      }

      const parts = person.userData.parts;
      const stride = isMoving ? Math.sin(walkTime) : Math.sin(walkTime) * 0.12;
      parts.leftArm.rotation.x = stride * 0.56;
      parts.rightArm.rotation.x = -stride * 0.56;
      parts.leftLeg.rotation.x = -stride * 0.46;
      parts.rightLeg.rotation.x = stride * 0.46;
      parts.leftFoot.rotation.x = Math.max(0, stride) * 0.2;
      parts.rightFoot.rotation.x = Math.max(0, -stride) * 0.2;
      person.position.y = 0;

      clouds.forEach((cloud) => {
        cloud.position.y = cloud.userData.baseY + Math.sin(clock.elapsedTime * 0.22 + cloud.userData.phase) * 0.18;
        cloud.position.x += delta * 0.08;
        if (cloud.position.x > 36) {
          cloud.position.x = -36;
        }
      });
      if (seoulClock) {
        updateSeoulClock(seoulClock);
      }
      updateSkyBySeoulTime(sky, visualSun, moon, sun, ambient, scene);

      const nearbyDestination = destinationEntries.find(({ entry }) => {
        const distanceToDoor = Math.hypot(
          person.position.x - entry.x,
          person.position.z - entry.z,
        );

        return distanceToDoor < 1.45;
      });
      updateActiveDestination(nearbyDestination?.id ?? null);

      cameraOffset.copy(cameraOffsetBase).applyAxisAngle(new THREE.Vector3(0, 1, 0), viewYaw);
      lookOffset.copy(lookOffsetBase).applyAxisAngle(new THREE.Vector3(0, 1, 0), viewYaw);
      cameraTarget.set(
        person.position.x + cameraOffset.x,
        cameraOffset.y,
        person.position.z + cameraOffset.z,
      );
      camera.position.lerp(cameraTarget, 1 - Math.pow(0.004, delta));
      lookTarget.set(
        person.position.x + lookOffset.x,
        lookOffset.y + viewPitch * 4.4,
        person.position.z + lookOffset.z,
      );
      camera.lookAt(lookTarget);

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      renderer.domElement.removeEventListener("pointermove", handlePointerMove);
      renderer.domElement.removeEventListener("pointerup", handlePointerUp);
      renderer.domElement.removeEventListener("pointercancel", handlePointerUp);
      resizeObserver.disconnect();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const material = object.material;
          if (Array.isArray(material)) {
            material.forEach((item) => {
              item.map?.dispose();
              item.dispose();
            });
          } else {
            material.map?.dispose();
            material.dispose();
          }
        }
      });
    };
  }, []);

  const activeDestination = destinations.find((destination) => destination.id === activeDestinationId) ?? null;

  return (
    <section id="Home" className="relative min-h-screen overflow-hidden bg-[#07111f]">
      <div ref={mountRef} className="absolute inset-0" />
      <div className="pointer-events-none absolute left-4 top-28 max-w-[min(520px,calc(100vw-2rem))] md:left-10 md:top-32">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Interactive Portfolio</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight text-white md:text-6xl">
          신건하
          <span className="block text-cyan-200">Three.js World</span>
        </h1>
      </div>
      <div className="pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-xs font-semibold text-slate-100 backdrop-blur md:text-sm">
        <span>WASD</span>
        <span className="text-slate-400">/</span>
        <span>Arrow Keys</span>
        <span className="text-slate-400">·</span>
        <span>Drag View</span>
      </div>
      {activeDestination && (
        <div className="pointer-events-none absolute bottom-20 left-1/2 -translate-x-1/2 rounded-full border border-cyan-200/35 bg-cyan-950/70 px-4 py-2 text-xs font-semibold text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.22)] backdrop-blur md:text-sm">
          {activeDestination.label} 집 앞에 도착했습니다
        </div>
      )}
      {activeDestination && (
        <aside className="pointer-events-none absolute right-4 top-32 w-[min(360px,calc(100vw-2rem))] rounded-lg border border-white/15 bg-slate-950/78 p-5 text-white shadow-2xl backdrop-blur md:right-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
            {activeDestination.panelTitle}
          </p>
          <h2 className="mt-3 text-2xl font-bold">{activeDestination.label}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            {activeDestination.summary}
          </p>
          <dl className="mt-5 grid grid-cols-[86px_1fr] gap-x-3 gap-y-2 text-sm">
            {activeDestination.details.map(([term, description]) => (
              <Fragment key={term}>
                <dt className="text-slate-400">{term}</dt>
                <dd className="text-slate-100">{description}</dd>
              </Fragment>
            ))}
          </dl>
        </aside>
      )}
    </section>
  );
}
