"use client";

import { useState, type FormEvent } from "react";
import { Field } from "@/components/ui/Field";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { FormStatus, type FormState } from "@/components/ui/FormStatus";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [state, setState] = useState<FormState>("idle");

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setState("loading");

    const form = event.currentTarget;
    const website = (form.elements.namedItem("website") as HTMLInputElement)?.value;

    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data?.errors) {
          const fieldErrors: Partial<Record<keyof FormValues, string>> = {};
          for (const key of Object.keys(data.errors)) {
            fieldErrors[key as keyof FormValues] = data.errors[key]?.[0];
          }
          setErrors(fieldErrors);
        }
        throw new Error(data?.message ?? "Falha no envio");
      }

      setState("success");
      setValues(initialValues);
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Não preencha este campo</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Nome" htmlFor="contact-name" required error={errors.name}>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
          />
        </Field>
        <Field label="E-mail" htmlFor="contact-email" required error={errors.email}>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Telefone" htmlFor="contact-phone" required error={errors.phone}>
          <Input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            aria-invalid={Boolean(errors.phone)}
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
          />
        </Field>
        <Field label="Assunto" htmlFor="contact-subject" required error={errors.subject}>
          <Input
            id="contact-subject"
            name="subject"
            required
            aria-invalid={Boolean(errors.subject)}
            value={values.subject}
            onChange={(event) => update("subject", event.target.value)}
          />
        </Field>
      </div>

      <Field label="Mensagem" htmlFor="contact-message" required error={errors.message}>
        <Textarea
          id="contact-message"
          name="message"
          required
          aria-invalid={Boolean(errors.message)}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
        />
      </Field>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" disabled={state === "loading"} size="lg">
          Enviar mensagem
        </Button>
        <FormStatus
          state={state}
          successMessage="Mensagem enviada com sucesso. Retornaremos em breve."
          errorMessage="Não foi possível enviar sua mensagem. Tente novamente."
        />
      </div>
    </form>
  );
}
