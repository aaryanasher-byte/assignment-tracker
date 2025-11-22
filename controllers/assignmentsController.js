const Assignment = require('../models/Assignment');

// GET all assignments
// GET all assignments with sorting and filtering
exports.getAllAssignments = async (req, res) => {
    try {
        let sortOption = {};
        let filterOption = {};

        // Filtering by priority
        if (req.query.priority) {
            filterOption.priority = req.query.priority;
        }

        // Sorting logic
        switch (req.query.sort) {
            case "dateAsc":
                sortOption = { dueDate: 1 };
                break;
            case "dateDesc":
                sortOption = { dueDate: -1 };
                break;
            case "priority":
                sortOption = { priority: 1 };
                break;
            case "alpha":
                sortOption = { title: 1 };
                break;
            default:
                sortOption = {};
        }

        const assignments = await Assignment.find(filterOption).sort(sortOption);

        res.render("assignments", { assignments });
    } catch (err) {
        console.log(err);
        res.send("Error loading assignments");
    }
};



// GET form to add new assignment
exports.getAddForm = (req, res) => {
    res.render('add');
};

// POST create new assignment
exports.createAssignment = async (req, res) => {
    const { course, title, dueDate, priority } = req.body;

    let errors = [];

    if (!course) errors.push("Course is required");
    if (!title) errors.push("Title is required");
    if (!dueDate) errors.push("Due date is required");

    // check if due date is in the past
    if (dueDate && new Date(dueDate) < new Date().setHours(0, 0, 0, 0)) {
        errors.push("Due date cannot be in the past");
    }

    // allowed priorities
    const allowed = ["Low", "Medium", "High"];
    if (!allowed.includes(priority)) {
        errors.push("Invalid priority selected");
    }

    // if errors, show form again
    if (errors.length > 0) {
        return res.render("add", { errors, formData: req.body });
    }

    // if everything good, save
    await Assignment.create(req.body);
    res.redirect("/assignments");
};


// GET edit form
exports.getEditForm = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        res.render('edit', { assignment });
    } catch (err) {
        console.log(err);
        res.send("Error loading assignment");
    }
};

// PUT update assignment
exports.updateAssignment = async (req, res) => {
    try {
        await Assignment.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/assignments');
    } catch (err) {
        console.log(err);
        res.send("Error updating assignment");
    }
};

// DELETE assignment
exports.deleteAssignment = async (req, res) => {
    try {
        await Assignment.findByIdAndDelete(req.params.id);
        res.redirect('/assignments');
    } catch (err) {
        console.log(err);
        res.send("Error deleting assignment");
    }
};
