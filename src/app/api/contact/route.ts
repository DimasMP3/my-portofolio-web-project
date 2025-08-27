import { type NextRequest, NextResponse } from "next/server";

// In-memory storage for messages (in production, you'd use a database)
let messages: Array<{
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: Date;
  isAdmin: boolean;
}> = [];

export async function POST(request: NextRequest) {
  try {
    const { name, email, message, action } = await request.json();

    if (action === "send_message") {
      if (!name || !email || !message) {
        return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
      }

      // Add user message
      const userMessage = {
        id: `user_${Date.now()}`,
        name,
        email,
        message,
        timestamp: new Date(),
        isAdmin: false,
      };

      messages.push(userMessage);

      return NextResponse.json({ 
        success: true, 
        message: "Message sent successfully",
        userMessage 
      });
    }

    if (action === "admin_reply") {
      const { reply, userEmail } = await request.json();
      
      if (!reply || !userEmail) {
        return NextResponse.json({ error: "Reply and user email are required" }, { status: 400 });
      }

      // Add admin reply
      const adminMessage = {
        id: `admin_${Date.now()}`,
        name: "Dimas Maulana Putra",
        email: "dimasmaulanaptra@gmail.com",
        message: reply,
        timestamp: new Date(),
        isAdmin: true,
      };

      messages.push(adminMessage);

      return NextResponse.json({ 
        success: true, 
        message: "Reply sent successfully",
        adminMessage 
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });

  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: "Email parameter is required" }, { status: 400 });
    }

    // Filter messages for the specific user
    const userMessages = messages.filter(msg => msg.email === email || msg.isAdmin);
    
    return NextResponse.json({ messages: userMessages });

  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Export function to get all messages (for admin use)
export async function getAllMessages() {
  return messages;
}