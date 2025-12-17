import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Loader2, 
  CheckCircle, 
  XCircle, 
  Search,
  Shield,
  AlertTriangle
} from 'lucide-react';
import { hashPrescription, PrescriptionData, truncateAddress } from '@/lib/hash';
import { verifyPrescription } from '@/lib/aptosClient';

const verifySchema = z.object({
  prescriptionId: z.string().min(1, 'Prescription ID is required'),
  doctorAddress: z.string().min(1, 'Doctor address is required').regex(/^0x[a-fA-F0-9]+$/, 'Invalid Aptos address format'),
  patientId: z.string().min(1, 'Patient ID is required'),
  drugName: z.string().min(1, 'Drug name is required'),
  dosage: z.string().min(1, 'Dosage is required'),
  notes: z.string().optional(),
});

type VerifyFormData = z.infer<typeof verifySchema>;

interface VerificationResult {
  verified: boolean;
  checked: boolean;
  prescriptionId?: string;
  doctorAddress?: string;
  dataHash?: string;
}

export default function Pharmacy() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);

  const form = useForm<VerifyFormData>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      prescriptionId: '',
      doctorAddress: '',
      patientId: '',
      drugName: '',
      dosage: '',
      notes: '',
    },
  });

  const onSubmit = async (data: VerifyFormData) => {
    setIsVerifying(true);
    setResult(null);

    try {
      const prescriptionData: PrescriptionData = {
        patientId: data.patientId,
        drugName: data.drugName,
        dosage: data.dosage,
        notes: data.notes || '',
        prescriptionId: data.prescriptionId,
      };

      const dataHash = hashPrescription(prescriptionData);
      const isValid = await verifyPrescription(data.doctorAddress, data.prescriptionId, dataHash);

      setResult({
        verified: isValid,
        checked: true,
        prescriptionId: data.prescriptionId,
        doctorAddress: data.doctorAddress,
        dataHash: dataHash,
      });
    } catch (error) {
      console.error('Verification error:', error);
      setResult({
        verified: false,
        checked: true,
        prescriptionId: data.prescriptionId,
        doctorAddress: data.doctorAddress,
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleReset = () => {
    form.reset();
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Verify Prescription</h1>
        <p className="text-muted-foreground">
          Enter the prescription details and doctor's wallet address to verify authenticity against the blockchain record.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Prescription Verification
          </CardTitle>
          <CardDescription>
            Enter the exact details as provided by the patient, including the doctor's wallet address
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="prescriptionId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prescription ID *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Enter prescription ID (e.g., RX-123456789)"
                        className="font-mono"
                        data-testid="input-verify-prescription-id"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="doctorAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doctor's Wallet Address *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="0x..."
                        className="font-mono"
                        data-testid="input-verify-doctor-address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="patientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient ID *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Enter patient identifier"
                        data-testid="input-verify-patient-id"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="drugName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medication Name *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="Enter medication name"
                        data-testid="input-verify-drug-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dosage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dosage *</FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        placeholder="e.g., 500mg twice daily"
                        data-testid="input-verify-dosage"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        placeholder="Enter any additional notes from the prescription..."
                        className="min-h-[100px] resize-none"
                        data-testid="input-verify-notes"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3">
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={isVerifying}
                  data-testid="button-verify-prescription"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Verify on Blockchain
                    </>
                  )}
                </Button>
                {result && (
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handleReset}
                    data-testid="button-reset-form"
                  >
                    Reset
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {result && result.checked && (
        <Card className={result.verified ? 'border-green-500/50' : 'border-destructive/50'}>
          <CardContent className="pt-6">
            {result.verified ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">
                    Authentic & Unused
                  </h3>
                  <p className="text-muted-foreground">
                    This prescription is valid and has not been used before.
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-left space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-muted-foreground">Prescription ID:</span>
                    <span className="font-mono">{result.prescriptionId}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-muted-foreground">Doctor Address:</span>
                    <span className="font-mono">{truncateAddress(result.doctorAddress || '', 10, 6)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span className="block">Data Hash:</span>
                    <code className="font-mono break-all">{result.dataHash}</code>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                  <XCircle className="w-10 h-10 text-destructive" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold text-destructive">
                    Invalid or Already Used
                  </h3>
                  <p className="text-muted-foreground">
                    This prescription could not be verified. It may be invalid, tampered with, or already used.
                  </p>
                </div>
                <div className="flex items-start gap-2 bg-muted/50 rounded-lg p-4 text-left">
                  <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium text-foreground mb-1">Possible reasons:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Prescription was never issued on the blockchain</li>
                      <li>Details do not match the original prescription exactly</li>
                      <li>Prescription has already been marked as used</li>
                      <li>Doctor address or prescription ID is incorrect</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">How Verification Works</p>
              <p>
                The prescription details you enter are hashed using SHA-256 and compared against
                the hash stored on the Aptos blockchain under the doctor's account. If the hashes match and the prescription
                has not been marked as used, the verification is successful.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
