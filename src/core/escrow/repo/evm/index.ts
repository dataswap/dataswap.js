import {
    Evm,
    withCallMethod,
    withSendMethod,
    EvmOutput
} from "@unipackage/net"
import { Message, ContractMessageDecoder } from "@unipackage/filecoin"
import { DataswapMessage } from "../../../../message/types"
import { Fund } from "../../types"
import { EscrowType } from "../../../../shared/types/escrowType"
import { decodeReternData } from "../../../../shared/decodeReturnData"

/**
 * Interface for EVM calls related to Escrow.
 */
interface EscrowCallEvm {

    /**
     * @notice Get owner fund.
     * @param type The Escrow type for the credited funds.
     * @param owner The destination address for the credited funds.
     * @param id The business id associated with the credited funds. 
     */
    getOwnerFund(
        type: EscrowType,
        owner: string,
        id: number): Promise<EvmOutput<Fund>>

    /**
     * @notice Get beneficiariesList.
     * @param type The Escrow type for the credited funds.
     * @param owner The destination address for the credited funds.
     * @param id The business id associated with the credited funds. 
     */
    getBeneficiariesList(
        type: EscrowType,
        owner: string,
        id: number
    ): Promise<EvmOutput<string[]>>

    /**
     * @notice Get beneficiary fund.
     * @param type The Escrow type for the credited funds.
     * @param owner The destination address for the credited funds.
     * @param id The business id associated with the credited funds. 
     * @param beneficiary The beneficiary address for the payment credited funds.
     */
    getBeneficiaryFund(
        type: EscrowType,
        owner: string,
        id: number,
        beneficiary: string
    ): Promise<EvmOutput<Fund>>
}

/**
 * Interface for EVM transactions related to Escrow.
 */
interface EscrowSendEvm {

    /**
     * Records the sent amount as credit for future withdrawals.
     * @param type The Escrow type for the credited funds.
     * @param owner The destination address for the credited funds.
     * @param id The business id associated with the credited funds.
     * @param amount The collateral funds.
     */
    collateral(
        type: EscrowType,
        owner: string,
        id: number,
        amount: BigInt
    ): Promise<EvmOutput<void>>

    /**
     * Redeem funds from collateral to available account after the collateral expires.
     * @param type The Escrow type for the credited funds.
     * @param owner The destination address for the credited funds.
     * @param id The business id associated with the credited funds.
     */
    collateralRedeem(
        type: EscrowType,
        owner: string,
        id: number
    ): Promise<EvmOutput<void>>

    /**
     * Withdraw funds from available account to authorized address.
     * @param type The Escrow type for the credited funds.
     * @param owner The destination address for the credited funds.
     * @param id The business id associated with the credited funds.
     */
    withdraw(
        type: EscrowType,
        owner: string,
        id: number
    ): Promise<EvmOutput<void>>

    /**
     * Records the sent amount as credit for future payment withdraw.
     * @param type The Escrow type for the credited funds.
     * @param owner The destination address for the credited funds.
     * @param id The business id associated with the credited funds.
     * @param amount The payment funds.
     */
    payment(
        type: EscrowType,
        owner: string,
        id: number,
        amount: BigInt
    ): Promise<EvmOutput<void>>

    /**
     * Records the sent amount as credit for future payment withdraw.
     * @param type The Escrow type for the credited funds.
     * @param owner The destination address for the credited funds.
     * @param id The business id associated with the credited funds.
     * @param beneficiary The beneficiary address for the payment credited funds.
     * @param amount The payment funds.
     */
    paymentSingleBeneficiary(
        type: EscrowType,
        owner: string,
        id: number,
        beneficiary: string,
        amount: BigInt
    ): Promise<EvmOutput<void>>

    /**
     * Withdraw funds from available account to beneficiary address.
     * @param type The Escrow type for the credited funds.
     * @param owner The destination address for the credited funds.
     * @param id The business id associated with the credited funds.
     * @param beneficiary The beneficiary address for the payment credited funds.
     */
    paymentWithdraw(
        type: EscrowType,
        owner: string,
        id: number,
        beneficiary: string
    ): Promise<EvmOutput<void>>

    /**
     * Transfer funds from payment to available account for total data prepare fee business.
     * @param type The Escrow type for the credited funds.
     * @param owner The destination address for the credited funds.
     * @param id The business id associated with the credited funds.
     * @param amount The transfer funds.
     */
    paymentTransfer(
        type: EscrowType,
        owner: string,
        id: number,
        amount: BigInt
    ): Promise<EvmOutput<void>>

    /**
     * Refund funds from payment to available account after the payment expires.
     * @param type The Escrow type for the credited funds.
     * @param owner The destination address for the credited funds.
     * @param id The business id associated with the credited funds.
     */
    paymentRefund(
        type: EscrowType,
        owner: string,
        id: number
    ): Promise<EvmOutput<void>>
}

/**
 * Combined interface for EVM calls and transactions related to Escrow.
 */
export interface EscrowOriginEvm
    extends EscrowCallEvm,
    EscrowSendEvm { }

/**
 * Implementation of EscrowOriginEvm with specific EVM methods.
 */
@withCallMethod(
    [
        "getOwnerFund",
        "getBeneficiariesList",
        "getBeneficiaryFund"
    ]
)
@withSendMethod(
    [
        "collateral",
        "collateralRedeem",
        "withdraw",
        "payment",
        "paymentSingleBeneficiary",
        "paymentWithdraw",
        "paymentTransfer",
        "paymentRefund"
    ]
)
export class EscrowOriginEvm extends Evm { }

/**
 * Extended class for EscrowOriginEvm with additional message decoding.
 */
export class EscrowEvm extends EscrowOriginEvm {
    async getOwnerFund(type: EscrowType, owner: string, id: number): Promise<EvmOutput<Fund>> {
        const metaRes = await super.getOwnerFund(type, owner, id)
        if (metaRes.ok && metaRes.data) {
            let dataRes = decodeReternData(new Fund(), metaRes.data as any)
            return {
                ok: true,
                data: dataRes
            }
        }
        return metaRes
    }

    async getBeneficiaryFund(type: EscrowType, owner: string, id: number, beneficiary: string): Promise<EvmOutput<Fund>> {
        const metaRes = await super.getBeneficiaryFund(type, owner, id, beneficiary)
        if (metaRes.ok && metaRes.data) {
            let dataRes = decodeReternData(new Fund(), metaRes.data as any)
            return {
                ok: true,
                data: dataRes
            }
        }
        return metaRes
    }

    /**
     * Decode a DataswapMessage from an EVM message.
     *
     * @param msg - Message to decode.
     * @returns EvmOutput containing the decoded DataswapMessage.
     */
    decodeMessage(msg: Message): EvmOutput<DataswapMessage> {
        const decoder = new ContractMessageDecoder(this)
        const decodeRes = decoder.decode(msg)
        if (!decodeRes.ok && !decodeRes.data) {
            return { ok: false, error: decodeRes.error }
        }

        let result: DataswapMessage = decodeRes.data as DataswapMessage
        switch (decodeRes.data!.method) {
            case "collateral":
            case "collateralRedeem":
            case "withdraw":
            case "payment":
            case "paymentSingleBeneficiary":
            case "paymentWithdraw":
            case "paymentTransfer":
            case "paymentRefund":
                break
            default:
                return {
                    ok: false,
                    error: "Not support method!",
                }
        }

        return {
            ok: true,
            data: result,
        }
    }
}