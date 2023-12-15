import {
    Evm,
    withCallMethod,
    withSendMethod,
    EvmOutput,
    EvmTransactionOptions,
} from "@unipackage/net"
import { Message, ContractMessageDecoder } from "@unipackage/filecoin"
import { DataswapMessage } from "../../../../../message/types"
import { DataType } from "../../../../../shared/types/dataType"

interface DatasetProofCallEvm {
    /**
     * Get dataset need append collateral funds
     * @param datasetId The ID of the dataset for which to get the append collateral.
     * @returns The collateral that need to append to dataset.
     */
    getDatasetAppendCollateral(datasetId: number): EvmOutput<bigint>

    /**
     *  Get dataset source Hashs
     * @param datasetId The ID of the dataset for which to get the proof.
     * @param dataType The data type of the proof.
     * @param index The index of the proof.
     * @param len The length of the proof.
     * @returns The Hashs of the dataset's proof.
     */
    getDatasetProof(
        datasetId: number,
        dataType: DataType,
        index: number,
        len: number
    ): EvmOutput<string[]>

    /**
     * Get dataset proof count.
     * @param datasetId The ID of the dataset for which to get the count of the proof.
     * @param dataType The data type of the proof.
     * @returns The count of the hashs of the dataset's proof.
     */
    getDatasetProofCount(
        datasetId: number,
        dataType: DataType
    ): EvmOutput<number>

    /**
     * Get dataset proof's submitter. 
     * @param datasetId The ID of the dataset for which to get the submitter of the proof.
     * @returns The address of the submitter of the proof.
     */
    getDatasetProofSubmitter(datasetId: number): EvmOutput<string>

    /**
     * Get dataset size. 
     * @param datasetId The ID of the dataset for which to get the size of the dataset.
     * @param dataType The data type of the proof.
     * @returns The size of the dataset.
     */
    getDatasetSize(datasetId: number, dataType: DataType): EvmOutput<number>

    /**
     * Retrieves the collateral requirement for a dataset identified by its ID.
     * @param datasetId - The ID of the dataset.
     * @returns The collateral requirement for the dataset.
     */
    getDatasetCollateralRequirement(datasetId: number): EvmOutput<bigint>

    /**
     * Retrieves the fees requirement for data auditors associated with a dataset identified by its ID.
     * @param datasetId - The ID of the dataset.
     * @returns The fees requirement for data auditors.
     */
    getDatasetDataAuditorFeesRequirement(datasetId: number): EvmOutput<bigint>

    /**
    * Retrieves the fees paid to data auditors for a dataset identified by its ID.
    * @param datasetId - The ID of the dataset.
    * @returns The fees paid to data auditors for the dataset.
    */
    getDatasetDataAuditorFees(datasetId: number): EvmOutput<bigint>

    /**
     * Checks if a specific car is present in a dataset identified by its ID.
     * @param datasetId - The ID of the dataset.
     * @param id - The ID of the car to check.
     * @returns True if the car is present; otherwise, false.
     */
    isDatasetProofallCompleted(
        datasetId: number,
        dataType: DataType
    ): EvmOutput<boolean>

    /**
     * Checks if a specific car is present in a dataset identified by its ID.
     * @param datasetId - The ID of the dataset.
     * @param id - The ID of the car to check.
     * @returns True if the car is present; otherwise, false.
     */
    isDatasetContainsCar(datasetId: number, id: number): EvmOutput<boolean>

    /**
     * Checks if multiple cars are present in a dataset identified by its ID.
     * @param datasetId - The ID of the dataset.
     * @param ids - An array of car IDs to check.
     * @returns True if all specified cars are present; otherwise, false.
     */
    isDatasetContainsCars(datasetId: number, ids: number[]): EvmOutput<boolean>

    /**
     * Checks if a specific address is the proof submitter for a dataset identified by its ID.
     * @param datasetId - The ID of the dataset.
     * @param submitter - The address to check.
     * @returns True if the address is the proof submitter; otherwise, false.
     */
    isDatasetProofSubmitter(
        datasetId: number,
        submitter: string
    ): EvmOutput<boolean>

}

interface DatasetProofSendEvm {
    /**
     * Submit proof root for a dataset
     * @param datasetId The ID of the dataset for which to submit proof.
     * @param dataType The data type of the proof.
     * @param mappingFilesAccessMethod The access method of the dataset.
     * @param rootHash The root hash of the proof.
     * @param options The options of transaction.
     */
    submitDatasetProofRoot(
        datasetId: number,
        dataType: DataType,
        mappingFilesAccessMethod: string,
        rootHash: string,
        options: EvmTransactionOptions
    ): EvmOutput<void>

    /**
     * Submit proof for a dataset 
     * @param datasetId The ID of the dataset for which to submit proof.
     * @param dataType The data type of the proof.
     * @param leafHashes The leaf hashes of the proof.
     * @param leafIndex The index of leaf hashes.
     * @param leafSizes The sizes of the leaf hashes.
     * @param completed A boolean indicating if the proof is completed. 
     * @param options The options of transaction.
     */
    submitDatasetProof(
        datasetId: number,
        dataType: DataType,
        leafHashes: string[],
        leafIndex: number,
        leafSizes: number[],
        completed: boolean,
        options: EvmTransactionOptions
    ): EvmOutput<void>

    /**
     *  Submit proof completed for a dataset.
     * @param datasetId The ID of the dataset for which to submit proof completed.
     * @param options The options of transaction.
     */
    submitDatasetProofCompleted(
        datasetId: number,
        options: EvmTransactionOptions
    ): EvmOutput<void>

    /**
     * Append dataset escrow funds. include datacap collateral and dataset auditor calculate fees 
     * @param datasetId The ID of the dataset for which to append funds.
     * @param datacapCollateral The collateral for datacap.
     * @param dataAuditorFees The fees for dataset'auditor. 
     * @param options The options of transaction.
     */
    appendDatasetFunds(
        datasetId: number,
        datacapCollateral: bigint,
        dataAuditorFees: bigint,
        options: EvmTransactionOptions
    ): EvmOutput<void>
}
/**
 * Combined interface for EVM calls and transactions related to DatasetProof contract.
 */
export interface DatasetProofOriginEvm
    extends DatasetProofCallEvm,
    DatasetProofSendEvm { }
/**
 * Implementation of DatasetProofOriginEvm with specific EVM methods.
 */
@withCallMethod([
    "getDatasetAppendCollateral",
    "getDatasetProof",
    "getDatasetProofCount",
    "getDatasetProofSubmitter",
    "getDatasetSize",
    "getDatasetCollateralRequirement",
    "getDatasetDataAuditorFeesRequirement",
    "getDatasetDataAuditorFees",
    "isDatasetProofallCompleted",
    "isDatasetContainsCar",
    "isDatasetContainsCars",
    "isDatasetProofSubmitter",
])
@withSendMethod([
    "submitDatasetProofRoot",
    "submitDatasetProof",
    "submitDatasetProofCompleted",
    "appendDatasetFunds",
])
export class DatasetProofOriginEvm extends Evm { }

/**
 * Extended class for DatasetProofEvm with additional message decoding.
 */
export class DatasetProofEvm extends DatasetProofOriginEvm {
    decodeMessage(msg: Message): EvmOutput<DataswapMessage> {
        const decoder = new ContractMessageDecoder(this)
        const decodeRes = decoder.decode(msg)
        if (!decodeRes.ok && !decodeRes.data) {
            return { ok: false, error: decodeRes.error }
        }

        let result: DataswapMessage = decodeRes.data as DataswapMessage
        switch (decodeRes.data!.method) {
            case "submitDatasetProofRoot" ||
                "submitDatasetProof" ||
                "submitDatasetProofCompleted" ||
                "appendDatasetFunds":
                result.datasetId = result.params.datasetId
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