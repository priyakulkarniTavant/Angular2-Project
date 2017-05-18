"use strict";
var EmployeeData = (function () {
    function EmployeeData() {
    }
    EmployeeData.prototype.createDb = function () {
        var employees = [
            {
                'id': 1,
                'employeeName': 'Naveen Kumar',
                'employeeCode': 'P0012',
                'joinedOn': 'March 19, 2016',
                'description': '29 Years',
                'salary': 19.95,
                'performance': 4.5,
                'imageUrl': './app/assets/images/employee1.png',
                'department': 'InformationTechnology',
                'tags': ['it', 'hardware', 'software', 'ites']
            },
            {
                'id': 2,
                'employeeName': 'Priya Kulkarni',
                'employeeCode': 'O0506',
                'joinedOn': 'March 18, 2016',
                'description': '28 Years',
                'salary': 32.99,
                'performance': 4.6,
                'imageUrl': './app/assets/images/employee2.jpg',
                'department': 'InformationTechnology'
            },
            {
                'id': 5,
                'employeeName': 'Vishal Jagani',
                'employeeCode': 'O0777',
                'joinedOn': 'May 21, 2016',
                'description': '29 Years',
                'salary': 8.9,
                'performance': 4.5,
                'imageUrl': './app/assets/images/employee3.jpg',
                'department': 'InformationTechnology',
                'tags': ['doc', 'software', 'hardware']
            },
            {
                'id': 8,
                'employeeName': 'Sunil MP',
                'employeeCode': 'TB022',
                'joinedOn': 'May 15, 2016',
                'description': '31 Years',
                'salary': 11.55,
                'performance': 3.0,
                'imageUrl': './app/assets/images/employee4.jpg',
                'department': 'HRD',
            },
            {
                'id': 10,
                'employeeName': 'Kirtesh Shah',
                'employeeCode': 'GM042',
                'joinedOn': 'October 15, 2015',
                'description': '32 Years',
                'salary': 35.95,
                'performance': 3.8,
                'imageUrl': './app/assets/images/employee1.png',
                'department': 'Finance',
            }
        ];
        return { employees: employees };
    };
    return EmployeeData;
}());
exports.EmployeeData = EmployeeData;
//# sourceMappingURL=employee-data.js.map