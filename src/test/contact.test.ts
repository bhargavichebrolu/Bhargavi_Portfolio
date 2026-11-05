import { describe, expect, it } from "vitest";
import { buildMailto, contactSchema, getContactDelivery } from "@/lib/contact";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  subject: "Graduate role",
  message: "Hello, I would like to talk about a role.",
};

describe("contact form", () => {
  it("accepts a complete message", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects an invalid email", () => {
    expect(contactSchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false);
  });

  it("rejects a message shorter than 10 characters", () => {
    expect(contactSchema.safeParse({ ...valid, message: "Hi" }).success).toBe(false);
  });

  it("encodes subject and body into the mailto link", () => {
    const link = buildMailto("me@example.com", valid);
    expect(link.startsWith("mailto:me@example.com?subject=Graduate%20role&body=")).toBe(true);
  });

  it("prefers an endpoint, then email, and reports when neither can deliver", () => {
    expect(getContactDelivery("https://forms.example/x", "me@example.com")).toBe("endpoint");
    expect(getContactDelivery("", "me@example.com")).toBe("mailto");
    expect(getContactDelivery("", "")).toBe("none");
  });
});
