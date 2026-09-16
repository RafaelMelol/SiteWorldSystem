"use client";

import { useRef, useState, type FormEvent } from "react";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Field,
  FormStatus,
  Honeypot,
  Input,
  Textarea,
  type FormState,
} from "@/components/ui/Form";

const DEFAULT_ERROR = "Não foi possível enviar seu currículo. Tente novamente.";

export function CareerForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState(DEFAULT_ERROR);
  const [fileName, setFileName] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");

    try {
      const response = await fetch("/api/oportunidades", {
        method: "POST",
        body: new FormData(event.currentTarget),
      });

      if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data?.message ?? DEFAULT_ERROR);
        setState("error");
        return;
      }

      setState("success");
      formRef.current?.reset();
      setFileName(null);
    } catch {
      setErrorMessage(DEFAULT_ERROR);
      setState("error");
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <Honeypot id="career-website" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Nome" htmlFor="career-name" required>
          <Input id="career-name" name="name" autoComplete="name" required />
        </Field>
        <Field label="E-mail" htmlFor="career-email" required>
          <Input id="career-email" name="email" type="email" autoComplete="email" required />
        </Field>
      </div>

      <Field label="Telefone" htmlFor="career-phone" required>
        <Input id="career-phone" name="phone" type="tel" autoComplete="tel" required />
      </Field>

      <Field
        label="Currículo (PDF ou DOC)"
        htmlFor="career-resume"
        required
        hint="Tamanho máximo de 5 MB."
      >
        <label
          htmlFor="career-resume"
          className="flex cursor-pointer items-center justify-center gap-2.5 rounded-lg border border-dashed border-border-subtle bg-surface-muted px-4 py-6 text-sm text-foreground/60 transition-colors hover:border-brand-400"
        >
          <UploadCloud className="size-4" aria-hidden />
          {fileName ?? "Clique para selecionar o arquivo"}
        </label>
        <input
          id="career-resume"
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          required
          className="sr-only"
          onChange={(event) => setFileName(event.target.files?.[0]?.name ?? null)}
        />
      </Field>

      <Field label="Observações" htmlFor="career-observations">
        <Textarea id="career-observations" name="observations" rows={4} />
      </Field>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={state === "loading"}>
          Enviar currículo
        </Button>
        <FormStatus
          state={state}
          successMessage="Currículo recebido com sucesso. Obrigado pelo interesse!"
          errorMessage={errorMessage}
        />
      </div>
    </form>
  );
}
