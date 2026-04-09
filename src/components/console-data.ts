export type Verdict = 'authentic' | 'manipulated' | 'uncertain';
export type Lang = 'ts' | 'py' | 'curl';
export type TabId = 'setup' | 'results' | 'usage';

export interface ScanRow {
  file: string;
  type: string;
  product: string;
  verdict: Verdict;
  conf: number;
  time: string;
}

export interface User {
  name: string;
  email: string;
  picture?: string | null;
}

export const SCANS: ScanRow[] = [
  { file: 'kyc_upload_2841.jpg',  type: 'image',    product: 'Sentinel', verdict: 'manipulated', conf: 0.97, time: '2m ago' },
  { file: 'press_release_v2.mp4', type: 'video',    product: 'Atlas',    verdict: 'authentic',   conf: 0.89, time: '5m ago' },
  { file: 'claims_doc_1194.pdf',  type: 'document', product: 'Foundry',  verdict: 'uncertain',   conf: 0.61, time: '12m ago' },
  { file: 'id_scan_front.jpg',    type: 'image',    product: 'Sentinel', verdict: 'authentic',   conf: 0.96, time: '18m ago' },
  { file: 'ceo_interview.mp4',    type: 'video',    product: 'Gotham',   verdict: 'manipulated', conf: 0.93, time: '34m ago' },
  { file: 'passport_scan.jpg',    type: 'image',    product: 'Sentinel', verdict: 'authentic',   conf: 0.91, time: '41m ago' },
  { file: 'article_draft.html',   type: 'text',     product: 'Atlas',    verdict: 'authentic',   conf: 0.78, time: '1h ago' },
  { file: 'profile_photo.png',    type: 'image',    product: 'Mirror',   verdict: 'manipulated', conf: 0.88, time: '2h ago' },
];

// Real API endpoints from DeepTrack API reference
export const API_BASE = process.env.NEXT_PUBLIC_DEEPTRACK_API_BASE_URL || 'https://facedetectionsystem-test-auth.onrender.com';

export const ENDPOINTS = {
  health:       `${API_BASE}/v1/health`,
  status:       `${API_BASE}/v1/status`,
  imagePredict: `${API_BASE}/v1/image/predict`,
  videoUpload:  `${API_BASE}/v1/video/predict/video`,
  videoFrame:   `${API_BASE}/v1/video/predict/frame`,
  videoJobs:    `${API_BASE}/v1/video/jobs`,
  videoJob:     (id: string) => `${API_BASE}/v1/video/jobs/${id}`,
  videoReset:   `${API_BASE}/v1/video/reset`,
  videoWs:      'wss://api.deeptrack.io/v1/video/ws',
  usageMonth:   `${API_BASE}/usage/month`,
} as const;

// Code snippets per language — using real API shapes
export const CODE_SNIPPETS: Record<string, { fname: string; install: { pm: string; pkg: string }[] | null; body: string }> = {
  ts: {
    fname: 'index.ts',
    install: [
      { pm: 'npm install', pkg: '@deeptrack' },
      { pm: 'yarn add',    pkg: '@deeptrack' },
    ],
    body: [
      "import { Deeptrack } from '@deeptrack';",
      "",
      "const client = new Deeptrack({",
      "  apiKey:  'dt_live_••••••••••••••••',",
      "  baseUrl: 'https://api.deeptrack.io',",
      "});",
      "",
      "// Classify a single image as Real or Fake",
      "const img = await client.image.predict(imageFile);",
      "console.log(img.prediction);            // 'Real' | 'Fake'",
      "console.log(img.confidence_percentage); // 0 – 100",
      "",
      "// Upload a video for async analysis (.mp4 .avi .mov .mkv, max 50 MB)",
      "const { job_id } = await client.video.upload(videoFile);",
      "",
      "// Poll until done",
      "const job = await client.video.getJob(job_id);",
      "console.log(job.result.label);      // 'REAL' | 'FAKE' | 'UNCERTAIN'",
      "console.log(job.result.confidence); // 0 – 100",
      "console.log(job.result.face_pct);   // % frames with a detected face",
    ].join('\n'),
  },
  py: {
    fname: 'main.py',
    install: [{ pm: 'pip install', pkg: 'deeptrack' }],
    body: [
      "from deeptrack import Deeptrack",
      "",
      "client = Deeptrack(",
      '    api_key="dt_live_••••••••••••••••",',
      '    base_url="https://api.deeptrack.io",',
      ")",
      "",
      "# Classify a single image as Real or Fake",
      'with open("photo.jpg", "rb") as f:',
      "    result = client.image.predict(f)",
      "",
      'print(result["prediction"])            # "Real" | "Fake"',
      'print(result["confidence_percentage"]) # 0 – 100',
      "",
      "# Upload a video for async analysis",
      'with open("video.mp4", "rb") as f:',
      "    job = client.video.upload(f)",
      "",
      "# Poll until done",
      'result = client.video.get_job(job["job_id"])',
      'print(result["result"]["label"])     # "REAL" | "FAKE" | "UNCERTAIN"',
      'print(result["result"]["face_pct"])  # % frames with a detected face',
    ].join('\n'),
  },
  curl: {
    fname: 'terminal',
    install: null,
    body: [
      "# Classify an image (JPEG, PNG, WEBP, BMP)",
      "curl https://api.deeptrack.io/v1/image/predict \\",
      '  -H "Authorization: Bearer dt_live_••••••••••••••••" \\',
      '  -F "file=@photo.jpg"',
      "",
      "# Response",
      '{',
      '  "filename": "photo.jpg",',
      '  "prediction": "Fake",',
      '  "confidence_percentage": 94.27,',
      '  "raw_scores": { "Real": 5.73, "Fake": 94.27 }',
      '}',
      "",
      "# Upload a video for async analysis (.mp4 .avi .mov .mkv, max 50 MB)",
      "curl https://api.deeptrack.io/v1/video/predict/video \\",
      '  -H "Authorization: Bearer dt_live_••••••••••••••••" \\',
      '  -F "file=@video.mp4"',
      "",
      "# Poll the job",
      "curl https://api.deeptrack.io/v1/video/jobs/{job_id} \\",
      '  -H "Authorization: Bearer dt_live_••••••••••••••••"',
    ].join('\n'),
  },
};