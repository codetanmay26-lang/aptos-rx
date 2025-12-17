import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Stethoscope, Building2, Shield, Link as LinkIcon, FileCheck, ArrowRight, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-12 relative">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        {/* Grid pattern */}
        <svg className="w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        {/* Gradient orbs - subtle and positioned */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl opacity-40" />
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl opacity-35" />
        <div className="absolute bottom-32 left-1/3 w-80 h-80 bg-primary/4 rounded-full blur-3xl opacity-30" />
      </div>

      <section className="text-center space-y-6 py-12 relative">
        {/* Local animated gradient overlay for hero section */}
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/8 rounded-full blur-3xl opacity-40 animate-pulse" />
          <div className="absolute -bottom-20 right-0 w-96 h-96 bg-blue-400/8 rounded-full blur-3xl opacity-30" style={{ animationDelay: '1s' }} />
        </div>

        <div className="space-y-2 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-primary">Blockchain Healthcare</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-transparent">
            AptosRx
          </h1>
        </div>

        <div className="space-y-3 max-w-2xl mx-auto">
          <p className="text-xl font-medium text-foreground">
            Blockchain-Powered Prescription Verification
          </p>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Secure, transparent, and tamper-proof prescription management on the Aptos blockchain. 
            Issue prescriptions as a doctor or verify authenticity as a pharmacy.
          </p>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto relative z-10">
        <Card className="group hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-border/40 hover:border-primary/30 bg-white/80 backdrop-blur-sm supports-[backdrop-filter]:bg-white/70 overflow-hidden relative">
          {/* Card background accent */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-2xl -z-10" />
          
          <CardHeader className="space-y-3">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center border border-primary/20 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all">
              <Stethoscope className="w-7 h-7 text-primary" />
            </div>
            <CardTitle className="text-2xl text-foreground">Doctor Dashboard</CardTitle>
            <CardDescription className="leading-relaxed text-muted-foreground">
              Issue secure, blockchain-verified prescriptions to patients with tamper-proof data integrity.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/doctor">
              <Button className="w-full gap-2 bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/30 transition-all text-white" data-testid="button-go-to-doctor">
                Go to Doctor Dashboard
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-border/40 hover:border-blue-500/30 bg-white/80 backdrop-blur-sm supports-[backdrop-filter]:bg-white/70 overflow-hidden relative">
          {/* Card background accent */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl -z-10" />
          
          <CardHeader className="space-y-3">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/15 to-blue-500/5 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all">
              <Building2 className="w-7 h-7 text-blue-600" />
            </div>
            <CardTitle className="text-2xl text-foreground">Pharmacy Portal</CardTitle>
            <CardDescription className="leading-relaxed text-muted-foreground">
              Verify prescription authenticity and usage status instantly using blockchain verification.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/pharmacy">
              <Button variant="outline" className="w-full gap-2 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/20 transition-all text-foreground border-border/50" data-testid="button-go-to-pharmacy">
                Go to Pharmacy Portal
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Simple, secure, and transparent prescription management</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: FileCheck, title: 'Issue Prescription', desc: 'Doctor fills in patient and medication details. Data is hashed and stored on Aptos.' },
            { icon: LinkIcon, title: 'Blockchain Record', desc: 'Prescription hash is recorded on Aptos blockchain, creating an immutable verification record.' },
            { icon: Shield, title: 'Verify & Dispense', desc: 'Pharmacy verifies prescription authenticity and checks if it has been used before dispensing.' },
          ].map((step, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-xl border border-border/40 hover:border-primary/30 bg-white/80 backdrop-blur-sm supports-[backdrop-filter]:bg-white/70 hover:shadow-lg transition-all duration-300 group"
            >
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -z-10 group-hover:bg-primary/8 transition-colors" />
              
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-primary/30">
                {idx + 1}
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-primary/20 transition-all border border-primary/10">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-2xl mx-auto text-center space-y-8 py-8 relative z-10">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-3">Why Blockchain?</h2>
          <p className="text-muted-foreground">Trust through transparency and cryptography</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { title: 'Immutable', desc: 'Records cannot be altered' },
            { title: 'Transparent', desc: 'Verifiable by anyone' },
            { title: 'Secure', desc: 'Cryptographically protected' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg bg-white/80 backdrop-blur-sm supports-[backdrop-filter]:bg-white/70 border border-border/40 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
            >
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl -z-10 group-hover:scale-150 transition-transform" />
              
              <p className="font-semibold text-primary group-hover:text-primary mb-2 transition-colors">{item.title}</p>
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
