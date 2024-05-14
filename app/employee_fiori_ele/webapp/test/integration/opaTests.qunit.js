sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/app/employeefioriele/test/integration/FirstJourney',
		'com/app/employeefioriele/test/integration/pages/EmployeeList',
		'com/app/employeefioriele/test/integration/pages/EmployeeObjectPage',
		'com/app/employeefioriele/test/integration/pages/AddressObjectPage'
    ],
    function(JourneyRunner, opaJourney, EmployeeList, EmployeeObjectPage, AddressObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/app/employeefioriele') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheEmployeeList: EmployeeList,
					onTheEmployeeObjectPage: EmployeeObjectPage,
					onTheAddressObjectPage: AddressObjectPage
                }
            },
            opaJourney.run
        );
    }
);