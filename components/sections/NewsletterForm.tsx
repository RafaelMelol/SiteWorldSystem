"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { FormStatus, type FormState } from "@/components/ui/FormStatus";

export function NewsletterForm() {
  const [state, setState] = useState<FormState>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");

    const form = event.currentTarget;
    const website = (form.elements.namedItem("website") as HTMLInputElement)?.value;

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, website }),
      });

      if (!response.ok) throw new Error("Falha no envio");

      setState("success");
      setName("");
      setEmail("");
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="newsletter-website">Não preencha este campo</label>
        <input
          id="newsletter-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="sr-only" htmlFor="newsletter-name">
          Nome
        </label>
        <Input
          id="newsletter-name"
          name="name"
          placeholder="Seu nome"
          autoComplete="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full"
        />
        <label className="sr-only" htmlFor="newsletter-email">
          E-mail
        </label>
        <Input
          id="newsletter-email"
          name="email"
          type="email"
          placeholder="seu@email.com"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full"
        />
        <Button type="submit" disabled={state === "loading"} className="w-full">
          Inscrever
        </Button>
      </div>
      <FormStatus
        state={state}
        successMessage="Inscrição recebida com sucesso."
        errorMessage="Não foi possível concluir sua inscrição. Tente novamente."
      />
    </form>
  );
}
