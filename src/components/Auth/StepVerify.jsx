import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, KeyRound } from "lucide-react";

export default function StepVerify({
  phoneNumber,
  onSubmit,
  onBack,
  isLoading,
}) {
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.length >= 4) onSubmit(code);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center mb-6">
        <button
          type="button"
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <ArrowRight className="w-5 h-5 text-slate-600" />
        </button>
        <div className="flex-1 text-center pr-8">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">
            کد تایید
          </h2>
          <p className="text-xs text-slate-500">
            کد ارسال شده به {phoneNumber} را وارد کنید
          </p>
        </div>
      </div>

      <div className="relative">
        <KeyRound className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <Input
          type="text"
          dir="ltr"
          placeholder="----"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="pr-10 text-center tracking-[1em] font-bold text-lg"
          maxLength={6}
          autoFocus
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        disabled={isLoading || code.length < 4}
      >
        {isLoading ? "در حال بررسی..." : "تایید و ورود"}
      </Button>
    </form>
  );
}
