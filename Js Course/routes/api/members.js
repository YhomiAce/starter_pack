const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../public/Members');

// Get all members
router.get('/', (req, res) => {
    // res.json(members);
    res.render('create')
});

// get a single member
router.get('/:id', (req, res) => {
    const found = members.some((member) => member.id == req.params.id);
    if (found) {
        res.json(members.filter(member => member.id == req.params.id));
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id} found` });
    }

});

router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    };
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: "Please include name and email field" });
    }
    members.push(newMember);
    // res.json(members);
    res.redirect('/');
});

// Update Members 
router.put('/:id', (req, res) => {
    const found = members.some((member) => member.id == req.params.id);
    if (found) {
        const updatedMember = req.body;
        members.forEach(member => {
            member.name = updatedMember.name ? updatedMember.name : member.name;
            member.email = updatedMember.email ? updatedMember.email : member.email;
            res.json({ msg: 'Member updated', members });
        });
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id} found` });
    }

});

// Delete a member
router.delete('/:id', (req, res) => {
    const found = members.some((member) => member.id == req.params.id);
    if (found) {
        res.json({ msg: "Member Deleted", memebers: members.filter(member => member.id !== parseInt(req.params.id)) });
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id} found` });
    }

});

module.exports = router;