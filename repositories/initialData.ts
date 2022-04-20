import { Note } from "./Note";
import { Categories } from "./categories";

export const Notes = {
    header: ["Name", "Created", "Category", "Contenet", "Dates", ""],

    notes: [
        new Note(0, 'Shopping list', 'April 20, 2021', Categories.TASK, 'Tomatoes, bread, butter, milk'),
        new Note(1, 'The theory of evolution', 'April 27, 2021', Categories.RANDOM_THOUGHT, 'The theory of evolution is a shortened form of the term “theory of evolution by natural selection,” which was proposed by Charles Darwin and Alfred Russel Wallace in the nineteenth century.'),
        new Note(2, 'New Feature', 'May 05, 2021', Categories.IDEA, 'Implement new feature 3/5/2021. Dont forget say this to boss 5/5/2021'),
        new Note(3, 'Shopping list 2', 'June 16, 2021', Categories.TASK, 'Bread, eggs, cucumber, sour cream, onion, tomatoe'),
        new Note(4, 'Don\'t forget', 'Jule 09, 2021', Categories.RANDOM_THOUGHT, 'Don\'t forget to wish Tom a happy birthday'),
        new Note(5, 'How improve engine', 'Jule 29, 2021', Categories.IDEA, 'Change valve travel'),
        new Note(6, 'Poetry', 'September 29, 2021', Categories.RANDOM_THOUGHT, 'On the sole Arabian tree, Herald sad and trumpet be, To whose sound chaste wings obey')
    ]
}

export const ArchiveNotes = {
    header: ['Note Category', 'Active', 'Archived', ""],

    notes: [new Note(7, 'How improve engine', 'September 14, 2019', Categories.IDEA, 'Change valve travel')]
}