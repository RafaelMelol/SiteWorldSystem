"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import {
  Field,
  FormStatus,
  Honeypot,
  Input,
  Textarea,
  type FormState,
} from "@/components/ui/Form";

type FieldName = "name" | "email" | "phone" | "subject" | "message";
type Values = Record<FieldName, string>;

const emptyValues: Values = { name: "", email: "", phone: "", subject: "", message: "" };

export function ContactForm() {
  const [values, setValues] = useState<Values>(emptyValues);
  const [errors, setErrors] = useState<Partial<Values>>({});
  const [state, setState] = useState<FormState>("idle");

  function fieldProps(field: FieldName) {
    return {
      id: `contact-${field}`,
      name: field,
      required: true,
      value: values[field],
      "aria-invalid": Boolean(errors[field]),
      onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setValues((current) => ({ ...current, [field]: event.target.value })),
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setState("loading");

    const website = String(new FormData(event.currentTarget).get("website") ?? "");

    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website }),
      });

      if (!response.ok) {
        const data = await response.json();
        const fieldErrors: Partial<Values> = {};
        for (const [field, messages] of Object.entries(data?.errors ?? {})) {
          fieldErrors[field as FieldName] = (messages as string[])[0];
        }
        setErrors(fieldErrors);
        setState("error");
        return;
      }

      setState("success");
      setValues(emptyValues);
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <Honeypot id="contact-website" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Nome" htmlFor="contact-name" required error={errors.name}>
          <Input autoComplete="name" {...fieldProps("name")} />
        </Field>
        <Field label="E-mail" htmlFor="contact-email" required error={errors.email}>
          <Input type="email" autoComplete="email" {...fieldProps("email")} />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Telefone" htmlFor="contact-phone" required error={errors.phone}>
          <Input type="tel" autoComplete="tel" {...fieldProps("phone")} />
        </Field>
        <Field label="Assunto" htmlFor="contact-subject" required error={errors.subject}>
          <Input {...fieldProps("subject")} />
        </Field>
      </div>

      <Field label="Mensagem" htmlFor="contact-message" required error={errors.message}>
        <Textarea {...fieldProps("message")} />
      </Field>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={state === "loading"}>
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
