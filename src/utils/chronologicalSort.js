/**
 * Modul Utilitas Pengurutan Kronologis Terstandarisasi (Terbaru ke Terlama)
 * Portofolio Anisah Rihadatul Aisy, S.Si.
 * 
 * Mendukung ISO "YYYY-MM", flag ongoing/isCurrent, dan fallback parser
 * teks bahasa Indonesia & Inggris untuk kompatibilitas data lama.
 */

export const MONTH_MAP = {
  jan: '01', januari: '01', january: '01',
  feb: '02', februari: '02', february: '02',
  mar: '03', maret: '03', march: '03',
  apr: '04', april: '04',
  mei: '05', may: '05',
  jun: '06', juni: '06', june: '06',
  jul: '07', juli: '07', july: '07',
  agu: '08', agustus: '08', aug: '08', august: '08',
  sep: '09', september: '09',
  okt: '10', oktober: '10', oct: '10', october: '10',
  nov: '11', november: '11',
  des: '12', desember: '12', dec: '12', december: '12'
};

const SHORT_MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
  'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
];

const FULL_MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

/**
 * Mengubah format ISO "YYYY-MM" menjadi nama bulan & tahun Indonesia (misal "2026-05" -> "Mei 2026")
 * @param {string} yyyyMm - String berformat "YYYY-MM"
 * @param {boolean} [short=true] - Gunakan singkatan 3 huruf jika true
 * @returns {string} Label tampilan terformat
 */
export function formatYearMonthToIndo(yyyyMm, short = true) {
  if (!yyyyMm || typeof yyyyMm !== 'string') return '';
  const match = yyyyMm.trim().match(/^(\d{4})-(\d{1,2})$/);
  if (!match) return yyyyMm;
  const year = match[1];
  const monthNum = parseInt(match[2], 10);
  if (monthNum < 1 || monthNum > 12) return yyyyMm;

  const names = short ? SHORT_MONTH_NAMES : FULL_MONTH_NAMES;
  return `${names[monthNum - 1]} ${year}`;
}

/**
 * Mengonversi string "YYYY-MM" menjadi milidetik UTC timestamp
 * @param {string} ym 
 * @returns {number}
 */
export function ymToTimestamp(ym) {
  if (!ym || typeof ym !== 'string') return 0;
  const match = ym.trim().match(/^(\d{4})-(\d{1,2})$/);
  if (!match) return 0;
  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  if (isNaN(year) || isNaN(month) || month < 1 || month > 12) return 0;
  return Date.UTC(year, month - 1, 1);
}

/**
 * Fallback Parser untuk mengekstrak start, end, dan status ongoing dari teks bebas
 * (Bahasa Indonesia & Inggris)
 * @param {string} text 
 * @returns {{ start: string|null, end: string|null, isOngoing: boolean }}
 */
export function parseTextDate(text) {
  if (!text || typeof text !== 'string') {
    return { start: null, end: null, isOngoing: false };
  }

  const clean = text.trim();
  const isOngoing = /sekarang|present|current|seumur hidup|selamanya/i.test(clean);

  // 1. Cek pola ISO YYYY-MM
  const isoMatches = [...clean.matchAll(/\b(20\d{2}|19\d{2})-(0[1-9]|1[0-2])\b/g)].map(m => `${m[1]}-${m[2]}`);
  if (isoMatches.length >= 2) {
    return { start: isoMatches[0], end: isoMatches[1], isOngoing };
  } else if (isoMatches.length === 1) {
    return { start: isoMatches[0], end: isOngoing ? null : isoMatches[0], isOngoing };
  }

  // 2. Cek pola Nama Bulan + Tahun (e.g., "Feb 2026", "Februari 2026", "December 2025")
  const monthKeys = Object.keys(MONTH_MAP).join('|');
  const monthYearRegex = new RegExp(`(?:(${monthKeys}))[a-z]*[\\s,.-]+(20\\d{2}|19\\d{2})`, 'gi');
  const myMatches = [];
  let match;
  while ((match = monthYearRegex.exec(clean)) !== null) {
    const mo = MONTH_MAP[match[1].toLowerCase()];
    const yr = match[2];
    myMatches.push(`${yr}-${mo}`);
  }

  if (myMatches.length >= 2) {
    return { start: myMatches[0], end: myMatches[1], isOngoing };
  } else if (myMatches.length === 1) {
    // Tangani bentuk rentang dengan tahun di ujung: "February - December 2025" atau "Feb s/d Mei 2026"
    const singleMonthRegex = new RegExp(`\\b(${monthKeys})\\b`, 'gi');
    const allMonths = [...clean.matchAll(singleMonthRegex)].map(x => MONTH_MAP[x[1].toLowerCase()]);
    if (allMonths.length >= 2) {
      const year = myMatches[0].split('-')[0];
      return { start: `${year}-${allMonths[0]}`, end: myMatches[0], isOngoing };
    }
    return { start: myMatches[0], end: isOngoing ? null : myMatches[0], isOngoing };
  }

  // 3. Fallback: Ekstrak hanya 4-digit tahun (e.g., "2024", "2023 & 2024", "2025-2026")
  const yearMatches = [...clean.matchAll(/\b(20\d{2}|19\d{2})\b/g)].map(m => m[1]);
  if (yearMatches.length >= 2) {
    return { start: `${yearMatches[0]}-01`, end: `${yearMatches[1]}-01`, isOngoing };
  } else if (yearMatches.length === 1) {
    return { start: `${yearMatches[0]}-01`, end: isOngoing ? null : `${yearMatches[0]}-01`, isOngoing };
  }

  return { start: null, end: null, isOngoing };
}

/**
 * Ekstraktor timestamp deterministik sesuai spesifikasi fitur
 * @param {object} item 
 * @param {'experiences'|'certifications'|'publications'|'projects'|'education'} type 
 * @returns {{ isOngoing: boolean, primaryTime: number, secondaryTime: number }}
 */
export function extractTimestamp(item, type) {
  if (!item || typeof item !== 'object') {
    return { isOngoing: false, primaryTime: 0, secondaryTime: 0 };
  }

  const ONGOING_BONUS = 9999999999999;

  switch (type) {
    case 'experiences':
    case 'experience':
    case 'exp': {
      const isCurrentFlag = item.isCurrent === true ||
        (typeof item.endDate === 'string' && item.endDate.toLowerCase() === 'present') ||
        (typeof item.period === 'string' && /sekarang|present|current/i.test(item.period));

      let startTs = ymToTimestamp(item.startDate);
      let endTs = ymToTimestamp(item.endDate);

      // Fallback ke string period jika YYYY-MM belum ada
      if (!startTs && !endTs && item.period) {
        const parsed = parseTextDate(item.period);
        if (parsed.start) startTs = ymToTimestamp(parsed.start);
        if (parsed.end) endTs = ymToTimestamp(parsed.end);
      }

      if (isCurrentFlag) {
        return {
          isOngoing: true,
          primaryTime: ONGOING_BONUS + (startTs || 0),
          secondaryTime: startTs || 0
        };
      }

      const primary = Math.max(endTs || 0, startTs || 0);
      const secondary = startTs || endTs || 0;
      return {
        isOngoing: false,
        primaryTime: primary,
        secondaryTime: secondary
      };
    }

    case 'certifications':
    case 'certification':
    case 'certs': {
      let issuedTs = ymToTimestamp(item.issuedYearMonth);
      let expTs = ymToTimestamp(item.expiryYearMonth);

      if (!issuedTs && item.issuedDate) {
        const parsed = parseTextDate(item.issuedDate);
        if (parsed.start) issuedTs = ymToTimestamp(parsed.start);
      }
      if (!expTs && item.expiryDate) {
        const parsedExp = parseTextDate(item.expiryDate);
        if (parsedExp.end || parsedExp.start) {
          expTs = ymToTimestamp(parsedExp.end || parsedExp.start);
        }
      }

      return {
        isOngoing: false,
        primaryTime: issuedTs || 0,
        secondaryTime: expTs || 0
      };
    }

    case 'publications':
    case 'publication':
    case 'pubs': {
      let pubTs = ymToTimestamp(item.publishedDate);

      if (!pubTs && item.publisher) {
        const parsed = parseTextDate(item.publisher);
        if (parsed.end || parsed.start) {
          pubTs = ymToTimestamp(parsed.end || parsed.start);
        }
      }

      return {
        isOngoing: false,
        primaryTime: pubTs || 0,
        secondaryTime: 0
      };
    }

    case 'projects':
    case 'project': {
      let projTs = ymToTimestamp(item.projectDate);

      if (!projTs && item.periodLabel) {
        const parsed = parseTextDate(item.periodLabel);
        if (parsed.start || parsed.end) {
          projTs = ymToTimestamp(parsed.start || parsed.end);
        }
      }

      if (!projTs && (item.description || item.title)) {
        const parsed = parseTextDate(`${item.title} ${item.description}`);
        if (parsed.end || parsed.start) {
          projTs = ymToTimestamp(parsed.end || parsed.start);
        }
      }

      return {
        isOngoing: false,
        primaryTime: projTs || 0,
        secondaryTime: 0
      };
    }

    case 'education':
    case 'edu': {
      const isOngoing = item.isCurrent === true ||
        (typeof item.endDate === 'string' && item.endDate.toLowerCase() === 'present') ||
        (typeof item.period === 'string' && /sekarang|present/i.test(item.period));

      let startTs = ymToTimestamp(item.startDate);
      let endTs = ymToTimestamp(item.endDate);

      if (!startTs && !endTs && item.period) {
        const parsed = parseTextDate(item.period);
        if (parsed.start) startTs = ymToTimestamp(parsed.start);
        if (parsed.end) endTs = ymToTimestamp(parsed.end);
      }

      if (isOngoing) {
        return {
          isOngoing: true,
          primaryTime: ONGOING_BONUS + (startTs || 0),
          secondaryTime: startTs || 0
        };
      }

      return {
        isOngoing: false,
        primaryTime: Math.max(endTs || 0, startTs || 0),
        secondaryTime: startTs || endTs || 0
      };
    }

    default:
      return { isOngoing: false, primaryTime: 0, secondaryTime: 0 };
  }
}

/**
 * Comparator deterministik mengurutkan koleksi secara descending (Terbaru -> Terlama).
 * Urutan evaluasi:
 * 1. Status ongoing / isCurrent di posisi paling atas
 * 2. Primary timestamp (selesai / terbit) terbesar ke terkecil
 * 3. Secondary timestamp (mulai) terbesar ke terkecil
 * 4. Fallback ID terbesar ke terkecil
 * 
 * @template T
 * @param {T[]} array 
 * @param {'experiences'|'certifications'|'publications'|'projects'|'education'} type 
 * @returns {T[]} Array baru yang telah terurut
 */
export function sortCollectionNewestFirst(array, type) {
  if (!Array.isArray(array)) return [];

  return [...array].sort((a, b) => {
    const metaA = extractTimestamp(a, type);
    const metaB = extractTimestamp(b, type);

    // 1. Status masih berlangsung di paling atas
    if (metaA.isOngoing && !metaB.isOngoing) return -1;
    if (!metaA.isOngoing && metaB.isOngoing) return 1;

    // 2. Timestamp utama (Selesai / Terbit) terbaru ke terlama
    if (metaB.primaryTime !== metaA.primaryTime) {
      return metaB.primaryTime - metaA.primaryTime;
    }

    // 3. Timestamp sekunder (Mulai) terbaru ke terlama
    if (metaB.secondaryTime !== metaA.secondaryTime) {
      return metaB.secondaryTime - metaA.secondaryTime;
    }

    // 4. Fallback: ID terbesar ke terkecil
    const idA = typeof a.id === 'number' ? a.id : parseInt(a.id, 10) || 0;
    const idB = typeof b.id === 'number' ? b.id : parseInt(b.id, 10) || 0;
    return idB - idA;
  });
}

/**
 * Mengurutkan seluruh koleksi fitur di dalam objek state portofolio
 * @param {object} stateObj 
 * @returns {object} stateObj termutasi dengan koleksi yang terurut
 */
export function sortAllCollections(stateObj) {
  if (!stateObj || typeof stateObj !== 'object') return stateObj;

  if (Array.isArray(stateObj.experiences)) {
    stateObj.experiences = sortCollectionNewestFirst(stateObj.experiences, 'experiences');
  }

  if (Array.isArray(stateObj.certifications)) {
    stateObj.certifications = sortCollectionNewestFirst(stateObj.certifications, 'certifications');
  }

  if (Array.isArray(stateObj.publications)) {
    stateObj.publications = sortCollectionNewestFirst(stateObj.publications, 'publications');
  }

  if (Array.isArray(stateObj.projects)) {
    stateObj.projects = sortCollectionNewestFirst(stateObj.projects, 'projects');
  }

  if (Array.isArray(stateObj.education)) {
    stateObj.education = sortCollectionNewestFirst(stateObj.education, 'education');
  }

  return stateObj;
}
