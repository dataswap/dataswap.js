import { SubmitMetadataSuccessTestKit, SubmitRequirementSuccessTestKit, ApproveDatasetMetadataSuccessTestKit } from "../../testkits/module/datasets/DatasetsMetadataTestKit"
import { SubmitDatasetProofRootSuccessTestKit } from "../../testkits/module/datasets/DatasetsProofTestKit"
import { DataType } from "../../../src/shared/types/datasetType"
import { DatasetsHelper } from "../../helpers/module/datasetsHelper"
import { Generator } from "../../shared/generator"
import { Accounts } from "../../shared/accounts"
import { ContractsManager } from "../../shared/contractsManager"

describe("Datasets", async () => {
    before(function () {
        this.sharedData = {}
        this.sharedData.datasetId = 0
        this.sharedData = {}
        this.sharedData.accounts = new Accounts()
        this.sharedData.generator = new Generator()
        this.sharedData.contractsManager = new ContractsManager(this.sharedData.accounts)
        this.sharedData.datasetHelper = new DatasetsHelper(
            this.sharedData.accounts,
            this.sharedData.generator,
            this.sharedData.contractsManager
        )
    })

    it("SubmitDatasetsMetadataSuccess", async function () {
        let testKit = new SubmitMetadataSuccessTestKit(
            this.sharedData.accounts,
            this.sharedData.generator,
            this.sharedData.contractsManager
        )
        let datasetId = await testKit.run()
        this.sharedData.datasetId = datasetId
    })

    it("SubmitRequirementSuccess", async function () {
        let datasetId = this.sharedData.datasetId
        let testKit = new SubmitRequirementSuccessTestKit(
            this.sharedData.accounts,
            this.sharedData.generator,
            this.sharedData.contractsManager
        )
        if (datasetId != 0) {
            await testKit.run(datasetId)
        } else {
            datasetId = await testKit.run()
            this.sharedData.datasetId = datasetId
        }
    })

    it("ApproveDatasetMetadataSuccessTestSuite", async function () {
        try {
            let testKit = new ApproveDatasetMetadataSuccessTestKit(
                this.sharedData.accounts,
                this.sharedData.generator,
                this.sharedData.contractsManager
            )
            let datasetId = this.sharedData.datasetId
            if (datasetId != 0) {
                await testKit.run(datasetId)
            } else {
                datasetId = await testKit.run()
                this.sharedData.datasetId = datasetId
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    })

    it("SubmitDatasetProofRootSuccess", async function () {
        try {
            let testKit = new SubmitDatasetProofRootSuccessTestKit(
                DataType.MappingFiles,
                this.sharedData.accounts,
                this.sharedData.generator,
                this.sharedData.contractsManager
            )
            let datasetId = this.sharedData.datasetId
            if (datasetId != 0) {
                await testKit.run(datasetId)
            } else {
                datasetId = await testKit.run()
                this.sharedData.datasetId = datasetId
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    })
})
