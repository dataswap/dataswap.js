import { IContractsManager } from "../../interfaces/setup/IContractsManater"

export class DataswapTestSetup {
    protected contractsManager: IContractsManager

    constructor(_contractsManager: IContractsManager) {
        this.contractsManager = _contractsManager
    }
    /**
     * Set up the helper, including setting up roles for contracts.
     * @returns A Promise that resolves when the setup is complete.
     */
    async run(): Promise<void> {
        try {
            await this.contractsManager.setupAccountsRoles()
            await this.contractsManager.setupContractsRoles()
            await this.contractsManager.setupContractsDependencies()
        } catch (error) {
            throw error
        }
    }
}