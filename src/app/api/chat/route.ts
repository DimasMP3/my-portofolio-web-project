import { type NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;

// Inisialisasi model Google Gemini
const genAI = new GoogleGenerativeAI(API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", 
});

// Konfigurasi keamanan
const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

const systemInstruction = `
  Kamu adalah asisten AI yang ramah dan informatif. Tujuan utamamu adalah untuk menjawab semua pertanyaan tentang Dimas Maulana Putra secara akurat.

  Gunakan informasi di bawah ini sebagai satu-satunya sumber kebenaran untuk data pribadi Dimas.

  INFORMASI PRIBADI:
  - Nama: Dimas Maulana Putra
  - Umur: 20 tahun
  - Status: Mahasiswa
  - Universitas: Bina Sarana Informatika
  - Semester: 5
  - Program Studi: Teknik Informatika
  - Domisili: Bogor
  - Tempat Lahir: Bogor

  SOCIAL MEDIA:
  - Instagram: @dmsmlnaptra
  - GitHub: DimasMP3
  - Facebook: Dimas Maulana
  - LinkedIn: Dimas Maulana Putra

  ATURAN DAN TUGAS UTAMA:
  1. Selalu jawab pertanyaan dengan ramah, sopan, dan detail menggunakan data yang tersedia.
  2. Jika pertanyaan bersifat teknis (seputar IT/pemrograman), gunakan pengetahuan umummu untuk menjelaskan dengan cara yang mudah dimengerti.
  3. Jika pertanyaan berada di luar data yang diberikan (misalnya topik yang sangat pribadi, opini, atau informasi yang tidak tercantum), jawab dengan jujur bahwa kamu tidak memiliki informasi tersebut.
  4. Gunakan gaya bahasa yang natural dan positif.
`;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "Pesan tidak boleh kosong" }, { status: 400 });
    }

    // Memulai sesi chat dengan instruksi sistem
    const chatSession = model.startChat({
      generationConfig: {
        temperature: 0.8, 
        topP: 0.9,
        topK: 40,
      },
      safetySettings,
      history: [
        {
          role: "user",
          parts: [{ text: systemInstruction }], 
        },
        {
          role: "model",
          parts: [{ text: "Tentu, saya siap membantu! Ada yang ingin Anda ketahui tentang Dimas Maulana Putra?" }],
        },
      ],
    });

    // Mengirim pesan dari pengguna ke Gemini
    const result = await chatSession.sendMessage(message);
    const response = result.response;
    const answer = response.text();

    return NextResponse.json({ answer: answer });

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan pada server AI" }, { status: 500 });
  }
}