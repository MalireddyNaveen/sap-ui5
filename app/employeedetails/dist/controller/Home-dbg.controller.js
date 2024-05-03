sap.ui.define([
    "./BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.c
     * ore.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator, JSONModel, MessageBox) {
        "use strict";

        return Controller.extend("com.app.employeedetails.controller.Home", {
            onInit: function () {
                const oLocalModel = new JSONModel({
                    fName: "",
                    lName: "",
                    gender: "",
                    DOB: "",
                    contractStarted: "",
                    email: "",
                    phone: ""
                });
                this.getView().setModel(oLocalModel, "localModel");
                this.getRouter().attachRoutePatternMatched(this.onEmployeeListLoad, this);
            },
            onEmployeeListLoad: function () {
                this.getView().byId("idEmployeeTable").getBinding("items").refresh(); 
            },
            onGoPress: function () {
                /**
                 * Create all the filters
                 * Use Multi Input in Filters so that we can push multiple filters at a time
                 * Add the Functionality for Clear Filter
                 */
                const oView = this.getView(),
                    oFirstNameFilter = oView.byId("idFNameFilterValue"),
                    sFirstName = oFirstNameFilter.getValue(),
                    oTable = oView.byId("idEmployeeTable"),
                    aFilters = [];

                sFirstName ? aFilters.push(new Filter("fName", FilterOperator.EQ, sFirstName)) : "";
                oTable.getBinding("items").filter(aFilters);
            },
            onSelectEmployee: function (oEvent) {
                const { ID, fName } = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
                const oRouter = this.getRouter();
                oRouter.navTo("RouteDetails", {
                    empId: ID,
                    empName: fName
                })
            },
            onCreateBtnPress: async function () {
                if (!this.oCreateEmployeeDialog) {
                    this.oCreateEmployeeDialog = await this.loadFragment("CreateEmployeeDialog")
                }
                this.oCreateEmployeeDialog.open();
            },

            onCloseDialog: function () {
                if (this.oCreateEmployeeDialog.isOpen()) {
                    this.oCreateEmployeeDialog.close()
                }
            },

            onCreateEmployee: async function () {
                const oPayload = this.getView().getModel("localModel").getProperty("/"),
                    oModel = this.getView().getModel("ModelV2");
                try {
                    await this.createData(oModel, oPayload, "/Employee");
                    this.getView().byId("idEmployeeTable").getBinding("items").refresh();
                    this.oCreateEmployeeDialog.close();
                } catch (error) {
                    this.oCreateEmployeeDialog.close();
                    MessageBox.error("Some technical Issue");
                }

            }
        });
    });
