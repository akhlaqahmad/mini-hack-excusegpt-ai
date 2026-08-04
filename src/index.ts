import { DurableObject } from "cloudflare:workers";
import { Hono } from "hono";

export class App extends DurableObject {
  private app = new Hono();

  constructor(state: DurableObjectState, env: any) {
    super(state, env);

    this.app.post("/api/generate", async (c) => {
      try {
        const { scenario, tone, vibe, mode } = await c.req.json();
        
        // In a real app, you'd call OpenAI here.
        // For this demo, we'll generate high-quality context-aware responses
        // using logic that simulates different vibes.
        
        const excuses = this.generateMockExcuses(scenario, tone, vibe, mode);
        
        return c.json({ excuses });
      } catch (err) {
        return c.json({ error: "Generation failed" }, 500);
      }
    });

    this.app.get("/api/health", (c) => c.json({ status: "ok" }));
  }

  async fetch(request: Request) {
    return this.app.fetch(request);
  }

  private generateMockExcuses(scenario: string, tone: string, vibe: number, mode: string) {
    // Basic "LLM" simulation logic for the prototype
    const s = scenario.toLowerCase();
    
    if (mode === 'reply') {
        return [
            { text: `Honestly, I was just thinking about that. But then I remembered I'm actually allergic to mediocre plans. Rain check?`, subtext: "Playful but firm." },
            { text: `I would, but I've already committed to my true love: a weighted blanket and 4 hours of obscure documentaries.`, subtext: "Self-deprecating humor works wonders." },
            { text: `My social battery just hit 2% and I forgot my charger. See you in 3-5 business days?`, subtext: "Relatable Gen-Z energy." }
        ];
    }

    if (mode === 'evidence') {
        return [
            { type: 'SMS Thread', text: `[MOM]: "Hey honey, just a reminder that the plumber is coming between 9am-1pm today. Can you please be there? I can't leave work."`, subtext: "Screenshot this and send it. Unbeatable." },
            { type: 'Calendar Conflict', text: `Conflict: "Emergency Dental Appointment (Root Canal Follow-up)" synchronized from 'Personal Health' calendar.`, subtext: "Nobody asks questions about root canals." },
            { type: 'OOO Email', text: `Subject: Urgent personal matter. "Hi team, something unexpected has come up at home that requires my immediate attention. I'll be offline for the rest of the day."`, subtext: "Vague enough to be serious, specific enough to be urgent." }
        ];
    }

    // Default: Excuse Generator
    if (tone === 'Professional') {
        return [
            { text: `I've unfortunately run into a bit of a scheduling overlap with a personal commitment that I can't move. My apologies for the late notice!`, subtext: "The classic 'personal commitment' never fails." },
            { text: `I'm dealing with some unexpected connectivity issues at home and won't be able to join the sync. I'll catch up on the notes immediately after.`, subtext: "Modern, tech-focused, and low friction." },
            { text: `I need to step away to handle an urgent household matter. I'll make sure to get my updates over to you by EOD.`, subtext: "Focuses on the deliverable, not the absence." }
        ];
    }

    if (tone === 'Chaos' || vibe > 80) {
        return [
            { text: `I accidentally joined a cult while waiting for my coffee and the initiation ceremony is exactly when our meeting starts. Send help (and the meeting notes).`, subtext: "Only for people who already think you're weird." },
            { text: `My cat has learned how to use the toaster and I'm currently in a tense negotiation for the kitchen. It's a hostage situation.`, subtext: "Absurdist and high-risk." },
            { text: `I am currently trapped in a revolving door. It's been 20 minutes. I think this is my life now.`, subtext: "The physical impossibility of attending." }
        ];
    }

    if (tone === 'Dramatic') {
        return [
            { text: `I have been struck by a sudden and profound realization that I am not emotionally prepared for this specific interaction today. I need a moment of silence (and a nap).`, subtext: "High drama, high honesty." },
            { text: `The universe has conspired against me. My keys are gone, my car won't start, and I'm pretty sure my neighbor's parrot is mocking me. I'm taking this as a sign.`, subtext: "Blame the cosmos." },
            { text: `I've been hit with a migraine so intense I can see the future, and in that future, I am definitely not at this meeting.`, subtext: "Medical but mystical." }
        ];
    }

    // Casual/Default
    return [
        { text: `Something came up last minute and I'm not gonna be able to make it. So sorry!`, subtext: "Simple, clean, effective." },
        { text: `Totally blanked on this until just now and I'm already halfway to a different thing. Can we reschedule?`, subtext: "Honesty (sort of) is refreshing." },
        { text: `Honestly, I'm just feeling super drained today and need to sit this one out. Hope you understand!`, subtext: "The 'Mental Health' card is becoming very acceptable." }
    ];
  }
}
