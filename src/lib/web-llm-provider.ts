import { CreateMLCEngine, MLCEngine, InitProgressReport } from "@mlc-ai/web-llm";

export class WebLLMProvider {
  private engine: MLCEngine | null = null;
  private modelId = "Llama-3-8B-Instruct-q4f32_1-MLC";

  async init(onProgress: (report: InitProgressReport) => void) {
    if (this.engine) return;
    this.engine = await CreateMLCEngine(this.modelId, { initProgressCallback: onProgress });
  }

  async sendMessage(
    messages: { role: "system" | "user" | "assistant"; content: string }[],
    onUpdate?: (content: string) => void
  ) {
    if (!this.engine) throw new Error("Engine not initialized");

    const chunks = await this.engine.chat.completions.create({
      messages,
      stream: true,
    });

    let fullText = "";
    for await (const chunk of chunks) {
      const content = chunk.choices[0]?.delta?.content || "";
      fullText += content;
      if (onUpdate) onUpdate(fullText);
    }

    return fullText;
  }

  isInitialized() {
    return this.engine !== null;
  }
}
