import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';

const APTOS_NODE_URL = import.meta.env.VITE_APTOS_NODE_URL || 'https://fullnode.testnet.aptoslabs.com/v1';
const CONTRACT_ADDRESS = import.meta.env.VITE_APTOS_CONTRACT_ADDRESS || '0x1';

const config = new AptosConfig({ 
  network: Network.TESTNET,
  fullnode: APTOS_NODE_URL 
});

export const aptosClient = new Aptos(config);

export function buildIssuePrescriptionPayload(prescriptionId: string, dataHashHex: string) {
  const prescriptionIdNum = parseInt(prescriptionId.replace(/\D/g, '').slice(-10) || '0', 10);
  const hashBytes = hexToBytes(dataHashHex);
  
  return {
    function: `${CONTRACT_ADDRESS}::aptos_rx_prescription::issue_prescription`,
    typeArguments: [],
    functionArguments: [prescriptionIdNum, hashBytes],
  };
}

export function buildMarkUsedPayload(prescriptionId: string) {
  const prescriptionIdNum = parseInt(prescriptionId.replace(/\D/g, '').slice(-10) || '0', 10);
  
  return {
    function: `${CONTRACT_ADDRESS}::aptos_rx_prescription::mark_used`,
    typeArguments: [],
    functionArguments: [prescriptionIdNum],
  };
}

export async function verifyPrescription(
  doctorAddress: string,
  prescriptionId: string, 
  dataHashHex: string
): Promise<boolean> {
  try {
    const prescriptionIdNum = parseInt(prescriptionId.replace(/\D/g, '').slice(-10) || '0', 10);
    const hashBytes = hexToBytes(dataHashHex);
    
    const result = await aptosClient.view({
      payload: {
        function: `${CONTRACT_ADDRESS}::aptos_rx_prescription::verify_prescription`,
        typeArguments: [],
        functionArguments: [doctorAddress, prescriptionIdNum, hashBytes],
      },
    });
    
    return result[0] as boolean;
  } catch (error) {
    console.error('Error verifying prescription:', error);
    return false;
  }
}

function hexToBytes(hex: string): number[] {
  const cleanHex = hex.startsWith('0x') ? hex.slice(2) : hex;
  const bytes: number[] = [];
  for (let i = 0; i < cleanHex.length; i += 2) {
    bytes.push(parseInt(cleanHex.substr(i, 2), 16));
  }
  return bytes;
}

export function getExplorerUrl(txHash: string): string {
  return `https://explorer.aptoslabs.com/txn/${txHash}?network=testnet`;
}

export { CONTRACT_ADDRESS, APTOS_NODE_URL };
