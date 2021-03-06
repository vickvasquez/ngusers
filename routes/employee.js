var Employee = require('../models/employees.js');

module.exports = function(app, router) {
    router.get('/employees', function(req, res) {
        Employee.find(function(err, employee) {
            if (err)
                res.next(err);
            res.status(200);
            res.json(employee);
        });
    });

    router.post('/employee/add', function(req, res) {
        var employee = new Employee({
            first: req.body.first,
            last: req.body.last,
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            postal_code: req.body.postal_code,
            abilities: req.body.abilities,
            data: {
                worked_hours: req.body.worked_hours,
                worked_hpd: req.body.worked_hpd,
                salary: req.body.salary
            }
        });

        employee.save(function(err, employee) {
            if (err)
                return next(err);
            res.status(201);
            res.json({
                employee: employee,
                message: 'Employee created!'
            });
        });
    });

    router.put('/employee/update/:employee_id', function(req, res) {
        Employee.findById(req.params.employee_id, function(err, employee) {
            if (err)
                return next(err);

            employee.first = req.body.first;
            employee.last = req.body.last;
            employee.street = req.body.street;
            employee.city = req.body.city;
            employee.state = req.body.state;
            employee.country = req.body.country;
            employee.postal_code = req.body.postal_code;
            employee.abilities = req.body.abilities;
            employee.data.worked_hours = req.body.worked_hours;
            employee.data.worked_hpd = req.body.worked_hpd;
            employee.data.salary = req.body.salary;

            employee.save(function(err, employee) {
                if (err)
                    return next(err);
                res.status(200);
                res.json({
                    message: 'Employee updated!'
                });
            });
        });
    });

    router.delete('/employee/delete/:employee_id', function(req, res) {
        Employee.remove({
            _id: req.params.employee_id
        }, function(err, employee) {
            if (err)
                return next(err);
            res.status(200);
            res.json({
                message: 'Employee deleted!'
            });
        });
    });

    app.use('/api', router);
};