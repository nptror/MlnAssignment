import { useEffect, useMemo, useRef, useState } from 'react';
import './HomePage.css';

const graph = {
  nodes: [
    { id: 'ong', label: 'Con ong', x: 480, y: 320 },
    { id: 'thuoc', label: 'Thuốc trừ sâu', x: 165, y: 130 },
    { id: 'khihau', label: 'Biến đổi khí hậu', x: 165, y: 505 },
    { id: 'sinhthai', label: 'Hệ sinh thái', x: 305, y: 320 },
    { id: 'thuphan', label: 'Sự thụ phấn', x: 650, y: 165 },
    { id: 'caytrong', label: 'Mùa màng', x: 745, y: 330 },
    { id: 'anninh', label: 'An ninh lương thực', x: 815, y: 505 },
    { id: 'giaLT', label: 'Giá lương thực', x: 575, y: 470 },
    { id: 'thunhap', label: 'Thu nhập nông dân', x: 430, y: 565 },
    { id: 'dicu', label: 'Di cư đô thị', x: 230, y: 560 },
  ],
  edges: [
    { id: 'e0', from: 'thuoc', to: 'ong' },
    { id: 'e1', from: 'khihau', to: 'ong' },
    { id: 'e2', from: 'ong', to: 'sinhthai' },
    { id: 'e3', from: 'ong', to: 'thuphan' },
    { id: 'e4', from: 'thuphan', to: 'caytrong' },
    { id: 'e5', from: 'caytrong', to: 'sinhthai' },
    { id: 'e6', from: 'caytrong', to: 'anninh' },
    { id: 'e7', from: 'caytrong', to: 'giaLT' },
    { id: 'e8', from: 'giaLT', to: 'thunhap' },
    { id: 'e9', from: 'thunhap', to: 'dicu' },
    { id: 'e10', from: 'anninh', to: 'giaLT' },
  ],
};

const quizQuestions = [
  {
    q: 'Một sợi chỉ bị kéo mạnh trong tấm lưới sẽ gợi ra điều gì?',
    options: ['Chỉ sợi chỉ đó bị ảnh hưởng', 'Cả tấm lưới có thể rung động', 'Lưới sẽ tự biến mất', 'Không có gì thay đổi'],
    correct: 1,
    explain: 'Một mắt xích nhỏ cũng có thể tác động đến toàn bộ hệ thống. Đây là cách trực quan để hiểu rằng sự vật luôn liên hệ và ảnh hưởng qua lại.',
  },
  {
    q: 'Hình ảnh một con ong bay từ hoa này sang hoa khác gợi đến phạm trù nào?',
    options: ['Cái riêng – cái chung', 'Nguyên nhân – kết quả', 'Nội dung – hình thức', 'Khả năng – hiện thực'],
    correct: 1,
    explain: 'Ong thụ phấn là nguyên nhân giúp hoa kết trái, cây sinh trưởng và duy trì hệ sinh thái. Đây là minh họa rõ cho quan hệ nguyên nhân và kết quả.',
  },
  {
    q: 'Khi một cây lớn bị chặt, đất dưới gốc dễ bị xói mòn. Đây là ví dụ của?',
    options: ['Bản chất – hiện tượng', 'Tất nhiên – ngẫu nhiên', 'Nguyên nhân – kết quả', 'Cái đơn nhất – cái chung'],
    correct: 2,
    explain: 'Việc chặt cây là nguyên nhân, còn đất bị xói mòn là kết quả phát sinh sau đó. Một hành động ban đầu có thể kéo theo nhiều hệ quả.',
  },
  {
    q: 'Một bông hoa đơn lẻ và cả cánh rừng hoa là hình ảnh gần nhất với phạm trù nào?',
    options: ['Cái riêng – cái chung', 'Nội dung – hình thức', 'Khả năng – hiện thực', 'Bản chất – hiện tượng'],
    correct: 0,
    explain: 'Một bông hoa là cái riêng, còn những đặc điểm lặp lại ở nhiều bông hoa thể hiện cái chung.',
  },
  {
    q: 'Nhìn thấy sóng biển dâng lên có thể chỉ là hiện tượng bên ngoài. Bản chất sâu xa có thể là gì?',
    options: ['Gió thổi nhẹ', 'Nhiệt độ toàn cầu tăng và băng tan', 'Trăng mọc', 'Dòng người đi lại nhiều'],
    correct: 1,
    explain: 'Sóng biển dâng là hiện tượng dễ quan sát, còn nguyên nhân sâu xa hơn là biến đổi khí hậu, nhiệt độ tăng và băng tan.',
  },
  {
    q: 'Một hạt giống nằm trong đất, chưa nảy mầm, nhưng có thể trở thành cây. Đây là ví dụ của?',
    options: ['Tất nhiên – ngẫu nhiên', 'Khả năng – hiện thực', 'Cái riêng – cái chung', 'Bản chất – hiện tượng'],
    correct: 1,
    explain: 'Hạt giống chứa khả năng trở thành cây. Khi có đủ nước, đất, ánh sáng, khả năng đó sẽ trở thành hiện thực.',
  },
  {
    q: 'Cùng là một cái cây, mùa xuân xanh mướt, mùa đông trơ cành. Điều này cho thấy?',
    options: ['Nội dung quyết định hình thức', 'Hình thức hoàn toàn độc lập với nội dung', 'Cái ngẫu nhiên quyết định tất nhiên', 'Hiện tượng không liên quan bản chất'],
    correct: 0,
    explain: 'Trạng thái bên trong của cây và điều kiện môi trường làm cho hình thức biểu hiện bên ngoài thay đổi theo mùa.',
  },
  {
    q: 'Một viên đá rơi xuống nước tạo ra những vòng tròn lan rộng. Hình ảnh này gần nhất với phạm trù nào?',
    options: ['Khả năng – hiện thực', 'Nguyên nhân – kết quả', 'Cái đơn nhất – cái chung', 'Bản chất – hiện tượng'],
    correct: 1,
    explain: 'Viên đá rơi xuống là nguyên nhân, còn những vòng tròn lan rộng là kết quả.',
  },
  {
    q: 'Biến đổi khí hậu là xu hướng lâu dài, nhưng một cơn bão cụ thể xảy ra vào ngày nào lại khó đoán. Đây là ví dụ của?',
    options: ['Tất nhiên – ngẫu nhiên', 'Nội dung – hình thức', 'Cái riêng – cái chung', 'Khả năng – hiện thực'],
    correct: 0,
    explain: 'Biến đổi khí hậu là xu hướng tất nhiên, còn thời điểm và cách thức xuất hiện của một cơn bão cụ thể mang tính ngẫu nhiên.',
  },
  {
    q: 'Một cú nhấp chuột trên mạng xã hội có thể lan thành xu hướng toàn cộng đồng. Điều này thể hiện điều gì?',
    options: ['Cá nhân hoàn toàn tách biệt xã hội', 'Mỗi hành động nhỏ đều không có tác động', 'Mối liên hệ giữa cái riêng và cái chung', 'Hiện tượng và bản chất không liên quan'],
    correct: 2,
    explain: 'Một hành động của cá nhân có thể ảnh hưởng đến cộng đồng, tức là cái riêng có thể tác động đến cái chung.',
  },
];

const lenses = [
  {
    id: 'tongthe',
    tab: 'Toàn cảnh mối liên hệ',
    kicker: 'Nguyên lý gốc',
    title: 'Mối liên hệ phổ biến',
    on: 'ALL',
    deep: [],
    caption: 'Xung lan khắp mạng — không nút nào đứng ngoài dòng chảy',
    paths: [
      ['thuoc', 'ong', 'thuphan', 'caytrong', 'giaLT', 'thunhap', 'dicu'],
      ['khihau', 'ong', 'sinhthai'],
      ['caytrong', 'anninh', 'giaLT'],
    ],
    blocks: [
      ['Bản chất', 'Không một nút nào trong sơ đồ tồn tại tách rời. Con ong nối với khí hậu, mùa màng, giá cả và dòng người di cư qua những liên hệ khách quan, phổ biến và đa dạng.'],
      ['Soi vào con ong', 'Một côn trùng nhỏ bé lại là mắt xích sinh tử của nhiều hệ cây trồng. Cắt mắt xích ấy, cả mạng lưới rung chuyển.'],
    ],
    engels: 'Đây chính là điều Engels khẳng định: tự nhiên là một chỉnh thể thống nhất, không phải tập hợp những vật cô lập.',
  },
  {
    id: 'rieng-chung',
    tab: 'Cái riêng — Cái chung',
    kicker: 'Cặp phạm trù 1',
    title: 'Cái riêng & Cái chung',
    on: ['ong', 'thuphan', 'caytrong', 'e3', 'e4'],
    deep: [],
    caption: 'Cái chung tỏa ra, hiện thân trong từng cái riêng',
    paths: [['thuphan', 'ong'], ['thuphan', 'caytrong']],
    blocks: [
      ['Phân biệt', 'Cái riêng: con ong cụ thể này, tổ ong này. Cái chung: vai trò tác nhân thụ phấn — thuộc tính lặp lại ở nhiều loài khác.'],
      ['Soi vào con ong', 'Cái chung không lơ lửng trừu tượng; nó chỉ tồn tại trong và thông qua từng cái riêng.'],
    ],
    engels: 'Cái phổ biến của tự nhiên luôn hiện thân trong những cái riêng lẻ, không tách rời chúng.',
  },
  {
    id: 'nhan-qua',
    tab: 'Nguyên nhân — Kết quả',
    kicker: 'Cặp phạm trù 2',
    title: 'Nguyên nhân & Kết quả',
    on: ['e0', 'e1', 'e3', 'e4', 'e7', 'e8', 'e9', 'thuoc', 'khihau', 'ong', 'thuphan', 'caytrong', 'giaLT', 'thunhap', 'dicu'],
    deep: [],
    caption: 'Dòng chảy nhân quả: nguyên nhân sinh ra kết quả nối tiếp',
    paths: [['thuoc', 'ong', 'thuphan', 'caytrong', 'giaLT', 'thunhap', 'dicu'], ['khihau', 'ong']],
    blocks: [
      ['Chuỗi nhân quả', 'Thuốc trừ sâu → ong suy giảm. Kết quả ấy lại thành nguyên nhân mới: thụ phấn giảm → mùa màng giảm → giá tăng → thu nhập nông dân giảm.'],
      ['Soi vào con ong', 'Mỗi nút vừa là kết quả của nút trước, vừa là nguyên nhân của nút sau.'],
    ],
    engels: 'Trong tự nhiên không có sự kiện đơn độc: mỗi hiện tượng vừa là kết quả, vừa là nguyên nhân.',
  },
  {
    id: 'tatnhien',
    tab: 'Tất nhiên — Ngẫu nhiên',
    kicker: 'Cặp phạm trù 3',
    title: 'Tất nhiên & Ngẫu nhiên',
    on: ['ong', 'thuphan', 'caytrong', 'e3', 'e4'],
    deep: [],
    jitter: ['thuoc', 'khihau', 'sinhthai', 'giaLT', 'thunhap', 'dicu', 'anninh'],
    caption: 'Xương sống đập đều — các nút ngẫu nhiên rung giật bất định',
    paths: [['ong', 'thuphan', 'caytrong']],
    blocks: [
      ['Phân biệt', 'Tất nhiên là mối liên hệ do bản chất sinh học quy định; ngẫu nhiên là biểu hiện cụ thể theo vùng, năm, loài hoặc biến cố.'],
      ['Soi vào con ong', 'Trục ong → thụ phấn → mùa màng đập đều, còn các nút ngoài rìa rung giật bất định.'],
    ],
    engels: 'Đằng sau những biến cố ngẫu nhiên rời rạc luôn có cái tất nhiên — mối liên hệ bản chất — chi phối.',
  },
  {
    id: 'noidung',
    tab: 'Nội dung — Hình thức',
    kicker: 'Cặp phạm trù 4',
    title: 'Nội dung & Hình thức',
    on: ['ong', 'sinhthai', 'thuphan', 'caytrong', 'e2', 'e3', 'e4', 'e5'],
    deep: [],
    caption: 'Nội dung tuần hoàn không ngừng bên trong hình thức ổn định',
    paths: [['ong', 'thuphan', 'caytrong', 'sinhthai', 'ong']],
    blocks: [
      ['Phân biệt', 'Nội dung là dòng vật chất, năng lượng và chức năng thụ phấn; hình thức là cấu trúc tổ chức của hệ sinh thái và sản xuất.'],
      ['Soi vào con ong', 'Vòng liên hệ là hình thức; dòng xung chạy tuần hoàn bên trong là nội dung luôn vận động.'],
    ],
    engels: 'Mọi sự vật là sự thống nhất giữa nội dung và hình thức — không thể tách cái này khỏi cái kia.',
  },
  {
    id: 'banchat',
    tab: 'Bản chất — Hiện tượng',
    kicker: 'Cặp phạm trù 5',
    title: 'Bản chất & Hiện tượng',
    on: ['giaLT', 'anninh', 'caytrong', 'e7', 'e10'],
    deep: ['ong', 'thuphan', 'sinhthai'],
    caption: 'Nhận thức lần từ hiện tượng vàng vào bản chất xanh',
    paths: [['giaLT', 'caytrong', 'thuphan', 'ong', 'sinhthai']],
    blocks: [
      ['Hai tầng', 'Hiện tượng là cái ta thấy ngay như giá rau tăng. Bản chất là sự đứt gãy mắt xích trong mạng liên hệ sinh thái.'],
      ['Soi vào con ong', 'Xung đi từ hiện tượng vào bản chất, mô phỏng quá trình nhận thức từ vẻ ngoài đến liên hệ ẩn sâu.'],
    ],
    engels: 'Khoa học phải vượt qua cái vẻ ngoài để nắm lấy mối liên hệ bản chất.',
  },
  {
    id: 'khanang',
    tab: 'Khả năng — Hiện thực',
    kicker: 'Cặp phạm trù 6',
    title: 'Khả năng & Hiện thực',
    on: ['anninh', 'giaLT', 'thunhap', 'dicu', 'caytrong', 'e6', 'e7', 'e8', 'e9', 'e10'],
    deep: [],
    ghost: ['dicu', 'anninh'],
    caption: 'Khả năng nhấp nháy dần kết tinh thành hiện thực',
    paths: [['caytrong', 'anninh', 'giaLT', 'thunhap', 'dicu']],
    blocks: [
      ['Phân biệt', 'Hiện thực là quần thể ong và sản lượng đang tồn tại. Khả năng là nguy cơ sụp đổ chuỗi thụ phấn khi điều kiện tích tụ đủ.'],
      ['Soi vào con ong', 'Các nút nhấp nháy là khả năng; dòng xung chạy tới là điều kiện để khả năng biến thành hiện thực.'],
    ],
    engels: 'Mỗi hiện thực ôm trong nó những khả năng đang chờ điều kiện để hiện thực hóa.',
  },
];

function nodeById(id) {
  return graph.nodes.find((node) => node.id === id);
}

function trimmedLine(a, b, pad = 18) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  return {
    x1: a.x + (dx / len) * pad,
    y1: a.y + (dy / len) * pad,
    x2: b.x - (dx / len) * pad,
    y2: b.y - (dy / len) * pad,
  };
}

function pathGeometry(nodeIds) {
  const pts = nodeIds.map((id) => {
    const node = nodeById(id);
    return { x: node.x, y: node.y };
  });
  const seg = [];
  let total = 0;
  for (let i = 0; i < pts.length - 1; i += 1) {
    const length = Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y);
    seg.push(length);
    total += length;
  }
  return { pts, seg, total };
}

function pointAt(geo, d) {
  let dist = ((d % geo.total) + geo.total) % geo.total;
  for (let i = 0; i < geo.seg.length; i += 1) {
    if (dist <= geo.seg[i]) {
      const t = geo.seg[i] === 0 ? 0 : dist / geo.seg[i];
      const a = geo.pts[i];
      const b = geo.pts[i + 1];
      return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
    }
    dist -= geo.seg[i];
  }
  return geo.pts.at(-1);
}

function HeroCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let focal = 0;
    let mx = 0;
    let my = 0;
    let tmx = 0;
    let tmy = 0;
    let frameId = 0;
    let particles = [];

    const spawn = (fresh) => ({
      x: (Math.random() - 0.5) * 2400,
      y: (Math.random() - 0.5) * 1700,
      z: fresh ? 60 + Math.random() * 1440 : 1500,
    });

    const setup = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      focal = Math.max(width, 700) * 0.9;
      const count = Math.min(130, Math.round((width * height) / 13000));
      particles = Array.from({ length: count }, () => spawn(true));
    };

    const project = (p) => {
      const scale = focal / p.z;
      return { sx: width / 2 + (p.x + mx * 60) * scale, sy: height / 2 + (p.y + my * 60) * scale, scale };
    };

    const frame = () => {
      mx += (tmx - mx) * 0.05;
      my += (tmy - my) * 0.05;
      ctx.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        particle.z -= 1.4;
        if (particle.z < 60) Object.assign(particle, spawn(false));
      });
      const projected = particles.sort((a, b) => b.z - a.z).map(project);
      for (let i = 0; i < projected.length; i += 1) {
        for (let j = i + 1; j < projected.length; j += 1) {
          const dx = projected[i].sx - projected[j].sx;
          const dy = projected[i].sy - projected[j].sy;
          const distance = Math.hypot(dx, dy);
          if (distance < 116) {
            const depth = Math.min(projected[i].scale, projected[j].scale);
            ctx.strokeStyle = `rgba(232,161,58,${0.2 * (1 - distance / 116) * Math.min(1, depth * 1.4)})`;
            ctx.beginPath();
            ctx.moveTo(projected[i].sx, projected[i].sy);
            ctx.lineTo(projected[j].sx, projected[j].sy);
            ctx.stroke();
          }
        }
      }
      projected.forEach((point, index) => {
        const fade = Math.min(1, (1500 - particles[index].z) / 260, (particles[index].z - 60) / 200);
        ctx.fillStyle = `rgba(243,196,123,${0.85 * fade})`;
        ctx.beginPath();
        ctx.arc(point.sx, point.sy, Math.max(0.5, point.scale * 2.1), 0, Math.PI * 2);
        ctx.fill();
      });
      if (!reduced) frameId = requestAnimationFrame(frame);
    };

    const onMouseMove = (event) => {
      tmx = (event.clientX / window.innerWidth - 0.5) * 2;
      tmy = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    setup();
    frame();
    window.addEventListener('resize', setup);
    window.addEventListener('mousemove', onMouseMove);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', setup);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return <canvas id="field" className="field" ref={ref} aria-hidden="true" />;
}

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function useTilt() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const elements = [...document.querySelectorAll('.tilt, .graph-card')];
    const cleanups = elements.map((element) => {
      const onMove = (event) => {
        const rect = element.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        const amount = element.classList.contains('graph-card') ? 7 : 11;
        element.style.transform = `rotateY(${px * amount}deg) rotateX(${-py * amount}deg) translateZ(${element.classList.contains('graph-card') ? 0 : 14}px)`;
      };
      const onLeave = () => {
        element.style.transform = 'rotateY(0) rotateX(0) translateZ(0)';
      };
      element.addEventListener('mousemove', onMove);
      element.addEventListener('mouseleave', onLeave);
      return () => {
        element.removeEventListener('mousemove', onMove);
        element.removeEventListener('mouseleave', onLeave);
      };
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);
}

function buildTree(activeTrait = 't1') {
  const points = [[160, 52], [120, 78], [200, 78], [92, 118], [160, 100], [228, 118], [70, 158], [128, 150], [195, 150], [250, 158], [110, 196], [210, 196], [160, 176], [160, 250], [120, 278], [200, 278], [88, 312], [160, 300], [232, 312], [70, 344], [130, 338], [195, 338], [250, 344]];
  const accent = activeTrait === 't2' ? '#7fd4e0' : activeTrait === 't3' ? '#6dc99a' : '#e8a13a';
  const secondary = activeTrait === 't2' ? '#3d7f8a' : activeTrait === 't3' ? '#2f7a58' : '#3a4a68';
  const ring = activeTrait === 't2' ? '#b7f0f8' : activeTrait === 't3' ? '#b7f0cf' : '#f3c47b';
  const pulseDur = activeTrait === 't2' ? 3.1 : activeTrait === 't3' ? 2.7 : 2.4;
  const lineClass = `tree-line ${activeTrait}`;
  return (
    <svg id="treeArt" className={`tree-svg ${activeTrait}`} viewBox="0 0 320 380" aria-label="Cây mạng lưới liên hệ">
      <defs>
        <radialGradient id="treeGlow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={ring} stopOpacity="0.9" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <filter id="treeBlur" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="1.8" />
        </filter>
      </defs>
      <g className="tree-backdrop" aria-hidden="true">
        <path className="tree-ripple ripple-a" d="M18 248 C72 206, 124 206, 160 248 C196 290, 248 290, 302 248" fill="none" stroke={accent} strokeOpacity="0.06" strokeWidth="8" strokeLinecap="round" />
        <path className="tree-ripple ripple-b" d="M18 248 C72 206, 124 206, 160 248 C196 290, 248 290, 302 248" fill="none" stroke={accent} strokeOpacity="0.12" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="9 11">
          <animate attributeName="stroke-dashoffset" values="0;40" dur={activeTrait === 't2' ? '4s' : '5.2s'} repeatCount="indefinite" />
        </path>
      </g>
      <g className={lineClass} aria-hidden="true">
        <line className="tree-path path-a" x1="20" y1="248" x2="300" y2="248" />
        <line className="tree-path path-b" x1="160" y1="248" x2="160" y2="52" />
        <circle className="tree-wave" cx="160" cy="248" r="14" />
        <circle className="tree-wave wave-2" cx="160" cy="248" r="30" />
      </g>
      <path className="tree-core" d="M148,250 L142,200 Q160,196 178,200 L172,250 Z" fill="#1c2740" />
      <circle className="tree-halo" cx="160" cy="250" r="56" fill="url(#treeGlow)" opacity="0.26" />
      <circle className="tree-core-glow" cx="160" cy="250" r="38" fill={accent} opacity="0.08" />
      {points.map(([x, y], index) => {
        const main = index === 0 || index === 13;
        const isRoot = index > 12;
        const color = main ? accent : isRoot ? secondary : '#3a4a68';
        const radius = main ? 6 : 4;
        const lane = index % 3;
        const delay = lane * 0.22 + (activeTrait === 't3' ? index * 0.04 : 0);
        return (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={radius} fill={color}>
            <animate attributeName="r" values={`${main ? 5 : 3.4};${main ? 7.5 : 5.2};${main ? 5 : 3.4}`} dur={`${pulseDur + (index % 5) * 0.24}s`} begin={`${delay}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.62;1;0.62" dur={`${pulseDur + 0.55 + (index % 4) * 0.23}s`} begin={`${delay}s`} repeatCount="indefinite" />
            <animate attributeName="transform" values={main ? 'translate(0 0);translate(0 -3);translate(0 0)' : `translate(0 0);translate(${activeTrait === 't3' ? 1 : 0} ${activeTrait === 't3' ? -2 : -1});translate(0 0)`} dur={`${5.8 + (index % 6) * 0.3}s`} begin={`${delay}s`} repeatCount="indefinite" />
          </circle>
        );
      })}
    </svg>
  );
}

function buildGlobe() {
  const arcs = ['M52 150 C95 64 205 64 248 150', 'M52 150 C95 236 205 236 248 150', 'M88 86 C142 126 194 174 212 230', 'M86 214 C138 172 188 124 214 70'];
  return (
    <svg id="globeArt" viewBox="0 0 300 300" aria-label="Quả địa cầu với các cung liên hệ">
      <defs><radialGradient id="globeG" cx="38%" cy="34%" r="72%"><stop offset="0%" stopColor="#1a2538" /><stop offset="100%" stopColor="#0c1018" /></radialGradient></defs>
      <circle cx="150" cy="150" r="120" fill="url(#globeG)" stroke="#27344c" strokeWidth="1.5" />
      <g fill="none" stroke="#2f3c56" strokeWidth="1"><ellipse cx="150" cy="150" rx="40" ry="120" /><ellipse cx="150" cy="150" rx="82" ry="120" /><ellipse cx="150" cy="150" rx="118" ry="120" /><ellipse cx="150" cy="150" rx="120" ry="42" /><ellipse cx="150" cy="150" rx="120" ry="86" /></g>
      {arcs.map((d) => <path key={d} d={d} fill="none" stroke="#e8a13a" strokeWidth="1.2" strokeDasharray="260" strokeDashoffset="260"><animate attributeName="stroke-dashoffset" values="260;0;260" dur="7s" repeatCount="indefinite" /></path>)}
      {[[96, 104], [210, 92], [238, 170], [150, 228], [78, 188], [170, 150]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" fill="#f3c47b" />)}
    </svg>
  );
}

function BeeArt() {
  return (
    <svg id="beeArt" viewBox="0 0 260 200" aria-label="Minh họa con ong">
      <defs>
        <clipPath id="abClip"><ellipse cx="96" cy="116" rx="64" ry="44" /></clipPath>
        <radialGradient id="thoraxG" cx="40%" cy="35%" r="70%"><stop offset="0%" stopColor="#f3c47b" /><stop offset="100%" stopColor="#c87f24" /></radialGradient>
      </defs>
      <g id="beeWings"><ellipse cx="120" cy="64" rx="46" ry="24" fill="rgba(127,212,224,0.18)" stroke="rgba(127,212,224,0.5)" strokeWidth="1.4" transform="rotate(-22 120 64)" /><ellipse cx="150" cy="70" rx="36" ry="19" fill="rgba(127,212,224,0.13)" stroke="rgba(127,212,224,0.4)" strokeWidth="1.2" transform="rotate(-8 150 70)" /></g>
      <ellipse cx="96" cy="116" rx="64" ry="44" fill="#e8a13a" />
      <g clipPath="url(#abClip)"><rect x="44" y="70" width="22" height="92" fill="#1a1408" /><rect x="86" y="70" width="22" height="92" fill="#1a1408" /><rect x="128" y="70" width="22" height="92" fill="#1a1408" /><ellipse cx="78" cy="96" rx="40" ry="16" fill="rgba(255,255,255,0.15)" /></g>
      <ellipse cx="96" cy="116" rx="64" ry="44" fill="none" stroke="#7a5212" strokeWidth="2" /><path d="M32,116 L12,116 L32,124 Z" fill="#1a1408" /><circle cx="170" cy="108" r="34" fill="url(#thoraxG)" /><circle cx="170" cy="108" r="34" fill="none" stroke="#7a5212" strokeWidth="2" /><circle cx="218" cy="98" r="25" fill="#1a1408" /><ellipse cx="226" cy="92" rx="8" ry="11" fill="#3a4254" /><path d="M222,76 Q236,52 250,54" fill="none" stroke="#1a1408" strokeWidth="3" strokeLinecap="round" /><path d="M214,74 Q220,50 232,44" fill="none" stroke="#1a1408" strokeWidth="3" strokeLinecap="round" /><circle cx="250" cy="54" r="3.5" fill="#1a1408" /><circle cx="232" cy="44" r="3.5" fill="#1a1408" />
      <g stroke="#1a1408" strokeWidth="3" strokeLinecap="round" fill="none"><path d="M150,148 Q146,170 134,178" /><path d="M174,150 Q174,172 166,184" /><path d="M198,142 Q204,164 200,180" /></g>
    </svg>
  );
}

function drawAnim1(ctx, width, height, time) {
  ctx.clearRect(0, 0, width, height);
  const cx = width / 2;
  const cy = height / 2;
  const nodes = [
    { x: cx, y: cy, r: 6, orbit: 0, angle: 0, speed: 0, color: '#d4a843' },
    ...Array.from({ length: 6 }, (_, i) => ({
      x: 0, y: 0, r: 3.6 + (i % 3) * 0.6,
      orbit: 36 + i * 6,
      angle: (Math.PI * 2 / 6) * i + i * 0.12,
      speed: 0.7 + i * 0.08,
      color: i % 3 === 0 ? '#e8873a' : (i % 3 === 1 ? '#d4a843' : '#5a9fd4'),
    })),
  ];
  nodes.forEach((a, i) => nodes.slice(i + 1).forEach((b) => { const d = Math.hypot(a.x - b.x, a.y - b.y); if (d < 95) { ctx.globalAlpha = (1 - d / 95) * 0.45; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); } }));
  ctx.restore();
  nodes.slice(1).forEach((n, i) => {
    const pulse = 1 + Math.sin(time * 2.4 + i) * 0.18;
    ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 2.8 * pulse, 0, Math.PI * 2); ctx.fillStyle = 'rgba(232,161,58,.10)'; ctx.fill();
    ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fillStyle = n.color; ctx.fill();
  });
  ctx.beginPath(); ctx.arc(cx, cy, 9, 0, Math.PI * 2); ctx.fillStyle = '#f2c46f'; ctx.fill();
  ctx.beginPath(); ctx.arc(cx, cy, 18 + Math.sin(time * 2) * 2, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(232,161,58,.18)'; ctx.lineWidth = 1.2; ctx.stroke();
}

function drawLabel(ctx, text, x, y, options = {}) {
  const {
    fillStyle = 'rgba(241,237,227,.92)',
    bgFill = 'rgba(8,11,18,.34)',
    borderStyle = 'rgba(255,255,255,.08)',
    font = '600 11px "Be Vietnam Pro", sans-serif',
    paddingX = 10,
    paddingY = 5,
    radius = 999,
    shadowColor = 'rgba(0,0,0,.24)',
    shadowBlur = 8,
    shadowOffsetY = 2,
    align = 'center',
  } = options;

  ctx.save();
  ctx.font = font;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  const textWidth = ctx.measureText(text).width;
  const boxWidth = textWidth + paddingX * 2;
  const boxHeight = 20 + paddingY * 2;
  const pillRadius = Math.min(radius, boxHeight / 2, boxWidth / 2);
  const left = align === 'left' ? x : align === 'right' ? x - boxWidth : x - boxWidth / 2;
  const top = y - boxHeight / 2;

  ctx.shadowColor = shadowColor;
  ctx.shadowBlur = shadowBlur;
  ctx.shadowOffsetY = shadowOffsetY;
  ctx.fillStyle = bgFill;
  ctx.strokeStyle = borderStyle;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(left + pillRadius, top);
  ctx.lineTo(left + boxWidth - pillRadius, top);
  ctx.quadraticCurveTo(left + boxWidth, top, left + boxWidth, top + pillRadius);
  ctx.lineTo(left + boxWidth, top + boxHeight - pillRadius);
  ctx.quadraticCurveTo(left + boxWidth, top + boxHeight, left + boxWidth - pillRadius, top + boxHeight);
  ctx.lineTo(left + pillRadius, top + boxHeight);
  ctx.quadraticCurveTo(left, top + boxHeight, left, top + boxHeight - pillRadius);
  ctx.lineTo(left, top + pillRadius);
  ctx.quadraticCurveTo(left, top, left + pillRadius, top);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.shadowColor = 'transparent';
  ctx.fillStyle = fillStyle;
  ctx.fillText(text, x, y + 0.5);
  ctx.restore();
}

function drawAnim2(ctx, width, height, time) {
  ctx.clearRect(0, 0, width, height);
  const zones = [
    { cx: 55, cy: height / 2, label: 'Vi mô' },
    { cx: width / 2, cy: height / 2, label: 'Vĩ mô' },
    { cx: width - 55, cy: height / 2, label: 'Vũ trụ' },
  ];
  const t = time * 1.2;
  const drawAtom = (cx, cy) => {
    ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fillStyle = '#d4a843'; ctx.fill();
    for (let i = 0; i < 3; i++) {
      const ang = t * 2 + (Math.PI * 2 / 3) * i;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate((Math.PI / 3) * i);
      ctx.beginPath(); ctx.ellipse(0, 0, 22, 10, 0, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(212,168,67,.18)'; ctx.lineWidth = .7; ctx.stroke(); ctx.restore();
      ctx.beginPath(); ctx.arc(cx + Math.cos(ang) * 22, cy + Math.sin(ang) * 8, 2.5, 0, Math.PI * 2); ctx.fillStyle = '#5a9fd4'; ctx.fill();
    }
  };
  const drawPlanet = (cx, cy) => {
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18); g.addColorStop(0, 'rgba(232,135,58,.65)'); g.addColorStop(1, 'transparent'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 18, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fillStyle = '#e8873a'; ctx.fill();
    for (let i = 0; i < 3; i++) { const orb = 14 + i * 10; ctx.beginPath(); ctx.arc(cx, cy, orb, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(200,170,100,.12)'; ctx.lineWidth = .6; ctx.stroke(); const a = t * (1.6 - i * 0.3) + i * 2; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * orb, cy + Math.sin(a) * orb, 2.2 - i * 0.2, 0, Math.PI * 2); ctx.fillStyle = ['#5a9fd4', '#7ad45a', '#d4a843'][i]; ctx.fill(); }
  };
  const drawGalaxy = (cx, cy) => { for (let arm = 0; arm < 2; arm++) { const offset = (Math.PI * 2 / 2) * arm; for (let i = 0; i < 40; i++) { const r = 3 + i * .8; const a = offset + i * .15 + t * .3; const x = cx + Math.cos(a) * r; const y = cy + Math.sin(a) * r * .6; ctx.beginPath(); ctx.arc(x, y, (1 - i / 40) * 2 + .5, 0, Math.PI * 2); ctx.fillStyle = `rgba(212,168,67,${(1 - i / 40) * .7})`; ctx.fill(); } } };
  drawAtom(zones[0].cx, zones[0].cy); drawPlanet(zones[1].cx, zones[1].cy); drawGalaxy(zones[2].cx, zones[2].cy);
  ctx.save();
  ctx.font = '11px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(200,195,180,.55)';
  zones.forEach((z) => ctx.fillText(z.label, z.cx, height - 10));
  ctx.restore();
  ctx.setLineDash([4, 4]); ctx.lineDashOffset = -time * 40; ctx.strokeStyle = 'rgba(212,168,67,.4)'; ctx.lineWidth = 1;
  for (let i = 0; i < 2; i++) { const x1 = zones[i].cx + 30, x2 = zones[i + 1].cx - 30, y = height / 2; ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x2, y); ctx.lineTo(x2 - 5, y - 3); ctx.lineTo(x2 - 5, y + 3); ctx.closePath(); ctx.fillStyle = 'rgba(212,168,67,.5)'; ctx.fill(); }
  ctx.setLineDash([]);
}

function drawAnim3(ctx, width, height, time) {
  ctx.clearRect(0, 0, width, height);
  const nodes = [
    { x: width * .15, y: height * .3, r: 5, color: '#d4a843' },
    { x: width * .5, y: height * .15, r: 5, color: '#e8873a' },
    { x: width * .85, y: height * .3, r: 5, color: '#5a9fd4' },
    { x: width * .25, y: height * .75, r: 5, color: '#7ad45a' },
    { x: width * .5, y: height * .6, r: 6, color: '#d4a843' },
    { x: width * .75, y: height * .75, r: 5, color: '#c45ad4' },
  ];
  const links = [
    [0, 1], [1, 2], [0, 3], [2, 5], [3, 4], [4, 5], [1, 4],
  ];
  links.forEach(([aI, bI], idx) => {
    const a = nodes[aI], b = nodes[bI];
    ctx.strokeStyle = ['#d4a843', '#5a9fd4', '#e8873a', 'rgba(196,90,212,.6)', '#7ad45a', '#c45ad4', 'rgba(212,168,67,.3)'][idx];
    ctx.lineWidth = idx === 2 ? 2.5 : 1.2;
    ctx.beginPath();
    if (idx === 4) { const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2 - 25; ctx.moveTo(a.x, a.y); ctx.quadraticCurveTo(mx, my, b.x, b.y); }
    else if (idx === 5) { ctx.setLineDash([2, 4]); ctx.lineDashOffset = -time * 15; let steps = 30; for (let i = 0; i <= steps; i++) { const tt = i / steps; const x = a.x + (b.x - a.x) * tt; const y = a.y + (b.y - a.y) * tt + Math.sin(tt * Math.PI * 4 + time * 3) * 5; i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } }
    else { ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); }
    ctx.stroke(); ctx.setLineDash([]);
  });
  drawLabel(ctx, 'Trực tiếp', (nodes[0].x + nodes[1].x) / 2, nodes[0].y - 22, {
    fillStyle: 'rgba(245,241,232,.96)',
    bgFill: 'rgba(12,16,24,.30)',
  });
  drawLabel(ctx, 'Bản chất', nodes[0].x + (nodes[3].x - nodes[0].x) * 0.52, nodes[0].y + (nodes[3].y - nodes[0].y) * 0.52, {
    fillStyle: 'rgba(243,239,230,.93)',
    bgFill: 'rgba(18,12,8,.24)',
    borderStyle: 'rgba(232,161,58,.14)',
  });
  drawLabel(ctx, 'Bên trong', nodes[4].x - 2, height - 16, {
    fillStyle: 'rgba(243,239,230,.93)',
    bgFill: 'rgba(10,14,22,.30)',
  });
  drawLabel(ctx, 'Gián tiếp', (nodes[4].x + nodes[5].x) / 2 + 8, (nodes[4].y + nodes[5].y) / 2 - 14, {
    fillStyle: 'rgba(243,239,230,.93)',
    bgFill: 'rgba(10,14,22,.30)',
  });
  drawLabel(ctx, 'Bên ngoài', nodes[3].x - 8, height - 34, {
    fillStyle: 'rgba(243,239,230,.93)',
    bgFill: 'rgba(10,14,22,.30)',
  });
  drawLabel(ctx, 'Không', nodes[2].x + 10, nodes[2].y - 22, {
    fillStyle: 'rgba(255,249,236,.68)',
    bgFill: 'rgba(12,16,24,.18)',
    borderStyle: 'rgba(255,255,255,.05)',
    shadowBlur: 6,
  });
  nodes.forEach((n, i) => { const pulse = Math.sin(time * 2 + i) * 2; const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 3 + pulse); g.addColorStop(0, `${n.color}40`); g.addColorStop(1, 'transparent'); ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 3 + pulse, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill(); ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fillStyle = n.color; ctx.fill(); });
}

function QuizSection() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(() => Array(quizQuestions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState('forward');
  const autoTimer = useRef(null);

  useEffect(() => () => window.clearTimeout(autoTimer.current), []);

  const score = answers.reduce((sum, answer, index) => sum + (answer === quizQuestions[index].correct ? 1 : 0), 0);
  const progress = submitted ? 100 : ((current + 1) / quizQuestions.length) * 100;
  const question = quizQuestions[current];
  const allAnswered = answers.every((answer) => answer !== null);

  const verdict = (() => {
    const pct = score / quizQuestions.length;
    if (pct === 1) return 'Xuất sắc — nguyên lý mối liên hệ phổ biến đã thấm vào tư duy của bạn.';
    if (pct >= 0.8) return 'Rất tốt — bạn đã nắm vững phần lớn các cặp phạm trù cơ bản.';
    if (pct >= 0.6) return 'Khá ổn — đọc lại các câu chưa đúng để củng cố thêm.';
    if (pct >= 0.4) return 'Tạm được — hãy quay lại các phần trên để ôn lại trước khi làm tiếp.';
    return 'Hãy đọc lại các phần phía trên — quay lại lần nữa sẽ tốt hơn.';
  })();

  const selectAnswer = (optionIndex) => {
    const wasUnanswered = answers[current] === null;
    setAnswers((previous) => previous.map((answer, index) => (index === current ? optionIndex : answer)));
    if (wasUnanswered && current < quizQuestions.length - 1) {
      window.clearTimeout(autoTimer.current);
      autoTimer.current = window.setTimeout(() => {
        setDirection('forward');
        setCurrent((value) => value + 1);
      }, 480);
    }
  };

  const resetQuiz = () => {
    setCurrent(0);
    setAnswers(Array(quizQuestions.length).fill(null));
    setSubmitted(false);
    setDirection('forward');
  };

  return (
    <section className="quiz" id="on-tap">
      <div className="wrap">
        <div className="quiz-head">
          <div className="eyebrow reveal">Ôn tập kiến thức</div>
          <h2 className="section-title reveal" data-d="1">Soi lại <em>tư duy biện chứng</em> qua mười tình huống</h2>
          <p className="lead reveal" data-d="2">
            Mười câu hỏi ngắn, mỗi câu một lát cắt nhỏ của nguyên lý mối liên hệ phổ biến và sáu cặp phạm trù.
          </p>
        </div>

        <div className="quiz-shell reveal" data-d="2">
          <div className="quiz-progress">
            <div className="quiz-step">Câu <b>{submitted ? quizQuestions.length : current + 1}</b> / <span>{quizQuestions.length}</span></div>
            <div className="quiz-bar"><div className="quiz-bar-fill" style={{ width: `${progress}%` }} /></div>
          </div>

          <div className="quiz-stage">
            {submitted ? (
              <>
                <div className="quiz-result-head">
                  <div className="quiz-score">{score}<span className="total">/{quizQuestions.length}</span></div>
                  <div className="quiz-score-label">Số câu đúng</div>
                  <div className="quiz-verdict">{verdict}</div>
                </div>
                <div className="quiz-review">
                  {quizQuestions.map((item, index) => {
                    const user = answers[index];
                    const ok = user === item.correct;
                    return (
                      <div className={`review-item ${ok ? 'correct' : 'wrong'}`} style={{ animationDelay: `${index * 55}ms` }} key={item.q}>
                        <div className="review-head">
                          <div className="review-num">Câu {index + 1}</div>
                          <div className="review-mark">{ok ? 'Đúng' : 'Chưa đúng'}</div>
                        </div>
                        <div className="review-q">{item.q}</div>
                        <div className="review-answers">
                          <div className={`review-ans ${ok ? 'is-correct' : 'is-wrong'}`}>
                            <span className="tag">Bạn chọn</span>
                            <span>{String.fromCharCode(65 + user)}. {item.options[user]}</span>
                          </div>
                          {!ok && (
                            <div className="review-ans is-correct">
                              <span className="tag">Đáp án</span>
                              <span>{String.fromCharCode(65 + item.correct)}. {item.options[item.correct]}</span>
                            </div>
                          )}
                        </div>
                        <div className="review-explain"><span className="lbl">Giải thích</span>{item.explain}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="retry-bar"><button className="qbtn primary" type="button" onClick={resetQuiz}>Làm lại từ đầu</button></div>
              </>
            ) : (
              <div className={direction === 'back' ? 'quiz-card back' : 'quiz-card'} key={current}>
                <div className="quiz-q">{question.q}</div>
                <div className="quiz-options">
                  {question.options.map((option, index) => (
                    <button className={`quiz-option ${answers[current] === index ? 'selected' : ''}`} type="button" key={option} onClick={() => selectAnswer(index)}>
                      <span className="letter">{String.fromCharCode(65 + index)}</span>
                      <span>{option}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {!submitted && (
            <div className="quiz-nav">
              <button className="qbtn" type="button" disabled={current === 0} onClick={() => { setDirection('back'); setCurrent((value) => Math.max(0, value - 1)); }}>
                ← Câu trước
              </button>
              {current === quizQuestions.length - 1 ? (
                <button className="qbtn primary" type="button" disabled={!allAnswered} onClick={() => setSubmitted(true)}>Nộp bài</button>
              ) : (
                <button className="qbtn" type="button" disabled={answers[current] === null} onClick={() => { setDirection('forward'); setCurrent((value) => Math.min(quizQuestions.length - 1, value + 1)); }}>
                  Câu tiếp →
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function GraphLab({ activeLens, onPulse, pulseNode }) {
  const [tick, setTick] = useState(0);
  const lens = lenses.find((item) => item.id === activeLens);
  const all = lens.on === 'ALL';
  const onSet = new Set(all ? [] : lens.on);
  const deepSet = new Set(lens.deep);
  const jitterSet = new Set(lens.jitter || []);
  const ghostSet = new Set(lens.ghost || []);

  const pulses = useMemo(() => {
    const streams = [];
    (lens.paths || []).forEach((path, pathIndex) => {
      const geo = pathGeometry(path);
      if (geo.total > 1) {
        for (let stream = 0; stream < 2; stream += 1) {
          streams.push({ geo, d: (geo.total / 2) * stream + pathIndex * 55 });
        }
      }
    });
    return streams;
  }, [lens]);

  useEffect(() => {
    let frame = 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const run = () => {
      setTick((value) => value + 2.7);
      if (!reduced) frame = requestAnimationFrame(run);
    };
    run();
    return () => cancelAnimationFrame(frame);
  }, [activeLens]);

  return (
    <div className="graph-3d">
      <div className="graph-card">
        <svg id="graph" viewBox="0 0 960 640">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#27344c" /></marker>
            <marker id="arrow-on" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#e8a13a" /></marker>
            <radialGradient id="sphereAmber" cx="35%" cy="32%" r="75%"><stop offset="0%" stopColor="#ffe0a8" /><stop offset="55%" stopColor="#e8a13a" /><stop offset="100%" stopColor="#9c6716" /></radialGradient>
            <radialGradient id="sphereCyan" cx="35%" cy="32%" r="75%"><stop offset="0%" stopColor="#d4f4f8" /><stop offset="55%" stopColor="#7fd4e0" /><stop offset="100%" stopColor="#3d7f8a" /></radialGradient>
            <radialGradient id="sphereDim" cx="35%" cy="32%" r="75%"><stop offset="0%" stopColor="#56607a" /><stop offset="100%" stopColor="#2a3450" /></radialGradient>
            <filter id="glow" x="-150%" y="-150%" width="400%" height="400%"><feGaussianBlur stdDeviation="3.4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>
          <g>
            {graph.edges.map((edge) => {
              const reverseForSpecificLens = activeLens === 'rieng-chung' && edge.id === 'e3';
              const line = reverseForSpecificLens
                ? trimmedLine(nodeById(edge.to), nodeById(edge.from))
                : trimmedLine(nodeById(edge.from), nodeById(edge.to));
              const lit = all || onSet.has(edge.id);
              return <line key={edge.id} {...line} className={`edge ${lit ? 'on' : 'off'}`} markerEnd={lit ? 'url(#arrow-on)' : 'url(#arrow)'} />;
            })}
          </g>
          <g id="fxLayer">
            {pulses.flatMap((pulse, index) => [0, 1, 2, 3].map((trail) => {
              const point = pointAt(pulse.geo, pulse.d + tick - trail * 13);
              return <circle key={`${index}-${trail}`} cx={point.x} cy={point.y} r={trail === 0 ? 5 : Math.max(1.4, 5 - trail * 1.2)} className="pulse-dot" opacity={trail === 0 ? 1 : Math.max(0.08, 0.5 - trail * 0.13)} filter={trail === 0 ? 'url(#glow)' : undefined} />;
            }))}
          </g>
          <g>
            {graph.nodes.map((node, index) => {
              const deep = deepSet.has(node.id);
              const lit = all || onSet.has(node.id) || deep;
              const above = node.y < 360;
              return (
                <g key={node.id} className={`node ${deep ? 'deep' : ''} ${lit && !deep ? 'on' : ''} ${!lit ? 'off' : ''} ${jitterSet.has(node.id) ? 'jitter' : ''} ${ghostSet.has(node.id) ? 'ghost' : ''} ${pulseNode === node.id ? 'pulse' : ''}`} style={{ animationDelay: `${-index * 0.9}s`, transformOrigin: `${node.x}px ${node.y}px` }} onClick={() => onPulse(node.id)}>
                  <circle cx={node.x} cy={node.y} r="9" className="node-dot" style={{ transformOrigin: `${node.x}px ${node.y}px` }} />
                  <text x={node.x} y={node.y + (above ? -17 : 25)} textAnchor="middle" className="node-label">{node.label}</text>
                </g>
              );
            })}
          </g>
        </svg>
        <div className="motion-cap">{lens.caption}</div>
        <div className="graph-hint">Nhấp một nút để thấy nó không hề cô lập</div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [activeLens, setActiveLens] = useState('tongthe');
  const [pulseNode, setPulseNode] = useState('');
  const [activeTrait, setActiveTrait] = useState('t1');
  const lens = lenses.find((item) => item.id === activeLens);
  useReveal();
  useTilt();

  const anim1Ref = useRef(null);
  const anim2Ref = useRef(null);
  const anim3Ref = useRef(null);

  const traitMeta = useMemo(() => ({
    t1: { title: 'Tính khách quan', text: 'Mối liên hệ vốn có, tồn tại không phụ thuộc ý muốn chủ quan.' },
    t2: { title: 'Tính phổ biến', text: 'Từ tự nhiên đến xã hội và tư duy, ở đâu cũng có mối liên hệ.' },
    t3: { title: 'Tính đa dạng', text: 'Mối liên hệ có nhiều kiểu: trực tiếp, gián tiếp, bản chất, hiện tượng...' },
  }), []);
  const traitActive = traitMeta[activeTrait];

  const pulseNeighbours = (id) => {
    setPulseNode(id);
    window.setTimeout(() => setPulseNode(''), 760);
  };

  useEffect(() => {
    const setupCanvas = (canvas, draw) => {
      if (!canvas) return () => {};
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth || 280;
      const height = canvas.clientHeight || 180;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      let frame = 0;
      let alive = true;
      const loop = () => {
        if (!alive) return;
        draw(ctx, width, height, performance.now() / 1000);
        frame = requestAnimationFrame(loop);
      };
      loop();
      return () => { alive = false; cancelAnimationFrame(frame); };
    };

    const cleanups = [
      setupCanvas(anim1Ref.current, (ctx, width, height, t) => drawAnim1(ctx, width, height, t)),
      setupCanvas(anim2Ref.current, (ctx, width, height, t) => drawAnim2(ctx, width, height, t)),
      setupCanvas(anim3Ref.current, (ctx, width, height, t) => drawAnim3(ctx, width, height, t)),
    ];

    return () => cleanups.forEach((cleanup) => cleanup && cleanup());
  }, []);

  return (
    <div className="dialectic-page">
      <nav>
        <div className="brand">Lăng kính <span>biện chứng</span></div>
        <div className="nav-links"><a href="#nguyen-ly">Nguyên lý</a><a href="#boi-canh">Bối cảnh</a><a href="#phong-thi-nghiem">Phòng thí nghiệm</a><a href="#ket-luan">Kết luận</a><a href="#on-tap">Ôn tập</a></div>
      </nav>

      <header className="hero">
        <HeroCanvas />
        <svg className="hero-honeycomb" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><pattern id="hc" width="56" height="96" patternUnits="userSpaceOnUse" patternTransform="scale(1.6)"><path d="M28,0 L56,16 L56,48 L28,64 L0,48 L0,16 Z" fill="none" stroke="rgba(232,161,58,0.07)" strokeWidth="1" /></pattern></defs><rect width="1200" height="800" fill="url(#hc)" /></svg>
        <div className="wrap"><h1 className="hero-quote">In nature, nothing takes place in <span className="accent">isolation</span>.</h1><div className="hero-attr">Friedrich Engels — Dialectics of Nature</div><p className="hero-vn"><strong>Trong tự nhiên, không có gì tồn tại một mình.</strong> Một sản phẩm tương tác đọc lại nhận định của Engels qua nguyên lý mối liên hệ phổ biến và sáu cặp phạm trù của phép biện chứng duy vật.</p><div className="scroll-hint">Cuộn để khám phá</div></div>
      </header>

      <section className="context reveal" id="boi-canh"><div className="wrap"><div className="eyebrow reveal">Bối cảnh lịch sử của nhận định</div><h2 className="section-title reveal" data-d="1">Engels <em>chống lại</em> điều gì?</h2><p className="lead reveal" data-d="2">Engels viết câu này trong <i>Dialectics of Nature</i> như một đòn phê phán trực tiếp vào tư duy siêu hình — lối tư duy nghiên cứu sự vật trong trạng thái cô lập, bất biến, tách khỏi môi trường và quá trình vận động của nó.</p><div className="vs-grid scene"><div className="vs-card meta tilt reveal" data-d="1"><div className="vs-tag">Tư duy siêu hình</div><h3>Những hạt cô lập</h3><div className="meta-map" aria-hidden="true"><span className="meta-dot" /><span className="meta-dot" /><span className="meta-dot" /></div><p>Xem sự vật như những vật thể tách rời, cố định, bất biến. Nghiên cứu từng vật riêng lẻ mà không thấy mối liên hệ, vận động và chuyển hóa.</p></div><div className="vs-card dialec tilt reveal" data-d="2"><div className="vs-tag">Tư duy biện chứng</div><h3>Một chỉnh thể thống nhất</h3><svg className="dialec-map" viewBox="0 0 180 72" aria-hidden="true"><line className="dialec-edge" x1="26" y1="36" x2="90" y2="16" /><line className="dialec-edge" x1="90" y1="16" x2="154" y2="36" /><line className="dialec-edge" x1="26" y1="36" x2="90" y2="58" /><line className="dialec-edge" x1="90" y1="58" x2="154" y2="36" /><circle className="dialec-dot" cx="26" cy="36" r="5" /><circle className="dialec-dot" cx="90" cy="16" r="5" /><circle className="dialec-dot" cx="154" cy="36" r="5" /><circle className="dialec-dot" cx="90" cy="58" r="5" /></svg><p>Xem thế giới là một mạng lưới các mối liên hệ — mọi sự vật ràng buộc, tác động và chuyển hóa lẫn nhau.</p></div></div><p className="sci-note reveal" data-d="2">Engels dựa vào học thuyết tế bào, định luật bảo toàn và chuyển hóa năng lượng, cùng thuyết tiến hóa Darwin để khẳng định tự nhiên là một mạng liên hệ.</p></div></section>

      <section className="principle reveal" id="nguyen-ly">
        <div className="wrap">
          <div className="principle-grid">
            <div>
              <div className="eyebrow reveal">Nền tảng lý thuyết</div>
              <h2 className="section-title reveal" data-d="1">
                Nguyên lý về <em>mối liên hệ phổ biến</em>
              </h2>
              <p className="lead reveal" data-d="2">
                Mọi sự vật, hiện tượng đều tồn tại trong mối liên hệ qua lại, tác động, ràng buộc và chuyển hóa cho nhau. Thế giới không phải tập hợp những hạt cô lập, mà là một chỉnh thể vật chất thống nhất.
              </p>
              <div className="principles-cards scene" role="list" aria-label="Ba tính của mối liên hệ phổ biến">
                {[
                  ['01', 'Tính khách quan', 'Mối liên hệ là cái vốn có của bản thân sự vật, tồn tại độc lập với ý thức con người.', 't1', 'Nền tảng khách quan'],
                  ['02', 'Tính phổ biến', 'Không có ngoại lệ — từ hạt vi mô đến thiên hà, từ tự nhiên đến xã hội và tư duy.', 't2', 'Lan rộng mọi nơi'],
                  ['03', 'Tính đa dạng', 'Bên trong – bên ngoài, bản chất – không bản chất, trực tiếp – gián tiếp… mỗi loại giữ vai trò khác nhau.', 't3', 'Nhiều tầng liên hệ'],
                ].map(([idx, title, text, tid, tag], index) => (
                  <button
                    key={idx}
                    type="button"
                    role="listitem"
                    className={`principle-card tilt reveal ${activeTrait === tid ? 'active' : ''} ${tid}`}
                    data-d={index + 1}
                    aria-pressed={activeTrait === tid}
                    onMouseEnter={() => setActiveTrait(tid)}
                    onMouseLeave={() => setActiveTrait('t1')}
                    onFocus={() => setActiveTrait(tid)}
                    onBlur={() => setActiveTrait('t1')}
                  >
                    <div className="principle-card-content">
                      <div className="principle-card-left">
                        <span className="principle-card-idx">{idx}</span>
                        <div className="principle-card-text">
                          <div className="principle-card-tag">{tag}</div>
                          <h3>{title}</h3>
                          <p>{text}</p>
                        </div>
                      </div>
                      <div className="principle-card-art" aria-hidden="true">
                        {tid === 't1' && <canvas ref={anim1Ref} width="280" height="180" className="principle-canvas" />}
                        {tid === 't2' && <canvas ref={anim2Ref} width="280" height="180" className="principle-canvas" />}
                        {tid === 't3' && <canvas ref={anim3Ref} width="280" height="180" className="principle-canvas" />}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lab reveal" id="phong-thi-nghiem"><div className="wrap"><div className="lab-head"><div className="lab-intro"><div className="eyebrow reveal">Sáu cặp phạm trù — vận dụng</div><h2 className="section-title reveal" data-d="1">Phòng thí nghiệm <em>biện chứng</em></h2><p className="lead reveal" data-d="2">Dưới đây là một hiện thực duy nhất: con ong và mạng lưới liên hệ của nó. Mỗi lăng kính không chỉ tô sáng sơ đồ — nó còn làm sơ đồ chuyển động theo đúng cách cặp phạm trù ấy mô tả.</p></div><div className="bee-stage reveal" data-d="2"><BeeArt /></div></div><div className="lens-bar reveal">{lenses.map((item) => <button className={`lens-btn ${activeLens === item.id ? 'active' : ''}`} key={item.id} type="button" onClick={() => setActiveLens(item.id)}>{item.tab}</button>)}</div><div className="stage reveal" data-d="1"><GraphLab activeLens={activeLens} onPulse={pulseNeighbours} pulseNode={pulseNode} /><div className="panel swap" key={lens.id}><div className="panel-kicker">{lens.kicker}</div><div className="panel-title">{lens.title}</div>{lens.blocks.map(([label, text]) => <div className="panel-block" key={label}><div className="lbl">{label}</div><p>{text}</p></div>)}<div className="panel-engels">{lens.engels}</div></div></div></div></section>

      <section className="conclusion reveal" id="ket-luan"><div className="wrap"><div className="globe-stage reveal">{buildGlobe()}</div><div className="eyebrow reveal centered">Ý nghĩa phương pháp luận</div><p className="big reveal" data-d="1">Hiểu rằng <em>không có gì tồn tại một mình</em> không chỉ là một mô tả về tự nhiên — đó là một mệnh lệnh về cách ta phải tư duy.</p><div className="method scene"><div className="method-card tilt reveal" data-d="1"><div className="num">01</div><h4>Quan điểm toàn diện</h4><p>Khi nghiên cứu hay giải quyết một vấn đề, phải xem xét nó trong tất cả các mối liên hệ, không cô lập một mặt.</p></div><div className="method-card tilt reveal" data-d="2"><div className="num">02</div><h4>Quan điểm lịch sử – cụ thể</h4><p>Phải đặt sự vật trong điều kiện không gian, thời gian xác định, vì các mối liên hệ luôn vận động và biến đổi.</p></div></div></div></section>

      <QuizSection />

      <footer><div className="brand">Lăng kính biện chứng</div><div>Sản phẩm minh họa nguyên lý mối liên hệ phổ biến & sáu cặp phạm trù của phép biện chứng duy vật.</div></footer>
    </div>
  );
}
