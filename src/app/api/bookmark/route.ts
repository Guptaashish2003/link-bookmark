import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { dataBasePrisma } from "@/databasePrisma";
import axios from "axios";
// POST /api/bookmarks
export async function POST(req: NextRequest) {
  try {
    const { url, userId } = await req.json();
    console.log("Received data:", { url, userId });

    if (!url || !userId) {
      return NextResponse.json(
        { error: "Missing required fields: url and userId" },
        { status: 400 }
      );
    }

    // 1️⃣ Fetch HTML of the given URL
    let title = "Untitled";
    let favicon = "/favicon.ico";
    try {
      const pageRes = await fetch(url);
      if (!pageRes.ok) throw new Error("Failed to fetch URL");

      const html = await pageRes.text();
      const $ = cheerio.load(html);

      // Extract title & favicon
      title = $("title").text() || "Untitled";
      favicon =
        $('link[rel="icon"]').attr("href") ||
        $('link[rel="shortcut icon"]').attr("href") ||
        "/favicon.ico";

      // Fix relative favicon path
      if (favicon.startsWith("/")) {
        const baseUrl = new URL(url);
        favicon = `${baseUrl.origin}${favicon}`;
      }
    } catch (err) {
      console.warn(`Could not fetch metadata for ${url}:`, err);
    }

    // 2️⃣ Try generating summary using Jina AI
    let summaryText = "Summary not available.";
    try {
      const encoded = encodeURIComponent(url.replace(/^https?:\/\//, ""));
      console.log("urlll.", encoded);
      const summaryRes = await axios.get(`https://r.jina.ai/${encoded}`);
      if (summaryRes) {
        summaryText = summaryRes.data;
      } else {
        console.warn(`Jina AI failed for ${url}: ${summaryRes}`);
      }
    } catch (err) {
      console.error("Error fetching summary from Jina AI:", err);
    }

        // 3️⃣ Save to Prisma
        const bookmark = await dataBasePrisma.bookmark.create({
          data: {
            link: url,
            title,
            content: summaryText,
            favicon,
            userId,
          },
        });

    return NextResponse.json({bookmark:bookmark,success:true}, { status: 201 });
  } catch (error) {
    console.error("POST /api/bookmarks error:", error);
    return NextResponse.json(
      { error: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
