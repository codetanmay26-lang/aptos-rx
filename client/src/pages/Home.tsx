import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Stethoscope, Building2, Shield, Link as LinkIcon, FileCheck, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          AptosRx
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Blockchain-Powered Prescription Verification
        </p>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Secure, transparent, and tamper-proof prescription management on the Aptos blockchain. 
          Issue prescriptions as a doctor or verify authenticity as a pharmacy.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card className="hover-elevate transition-shadow">
          <CardHeader className="space-y-2">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Doctor Dashboard</CardTitle>
            <CardDescription>
              Issue secure, blockchain-verified prescriptions to patients with tamper-proof data integrity.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/doctor">
              <Button className="w-full gap-2" data-testid="button-go-to-doctor">
                Go to Doctor Dashboard
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover-elevate transition-shadow">
          <CardHeader className="space-y-2">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-xl">Pharmacy Portal</CardTitle>
            <CardDescription>
              Verify prescription authenticity and usage status instantly using blockchain verification.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/pharmacy">
              <Button variant="outline" className="w-full gap-2" data-testid="button-go-to-pharmacy">
                Go to Pharmacy Portal
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-center mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto">
              <FileCheck className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="font-medium">1. Issue Prescription</h3>
            <p className="text-sm text-muted-foreground">
              Doctor fills in patient and medication details. Data is hashed and stored on Aptos.
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto">
              <LinkIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="font-medium">2. Blockchain Record</h3>
            <p className="text-sm text-muted-foreground">
              Prescription hash is recorded on Aptos blockchain, creating an immutable verification record.
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto">
              <Shield className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="font-medium">3. Verify & Dispense</h3>
            <p className="text-sm text-muted-foreground">
              Pharmacy verifies prescription authenticity and checks if it has been used before dispensing.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-2xl mx-auto text-center space-y-4 py-8">
        <h2 className="text-lg font-semibold">Why Blockchain?</h2>
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="font-medium">Immutable</p>
            <p className="text-muted-foreground">Records cannot be altered</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="font-medium">Transparent</p>
            <p className="text-muted-foreground">Verifiable by anyone</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="font-medium">Secure</p>
            <p className="text-muted-foreground">Cryptographically protected</p>
          </div>
        </div>
      </section>
    </div>
  );
}
