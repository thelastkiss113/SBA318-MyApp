//public/script.js
// Fetch all grades when the page loads
fetch('/api/grades')
    .then(response => response.json())
    .then(data => {
        const gradesDiv = document.getElementById('gradeTable'); // Corrected ID
        gradesDiv.innerHTML = data.map(grade => `
            <tr>
                <td>${grade._id}</td>
                <td>${grade.score}</td>
                <td><button onclick="deleteGrade('${grade._id}')">Delete</button></td>
            </tr>
        `).join('');
    })
    .catch(error => console.error('Error fetching grades:', error));

// Function to fetch a specific grade by ID
document.getElementById('fetchGradeBtn').addEventListener('click', function() {
    const gradeId = document.getElementById('fetchId').value; // Corrected ID
    fetch(`/api/grades/${gradeId}`) // Fetch the grade by ID
        .then(response => {
            if (!response.ok) {
                throw new Error('Grade not found');
            }
            return response.json();
        })
        .then(grade => {
            const gradesDiv = document.getElementById('gradeTable'); // Consistent ID
            // Clear previous results
            gradesDiv.innerHTML = '';
            // Display the fetched grade
            gradesDiv.innerHTML += `
                <tr>
                    <td>${grade._id}</td>
                    <td>${grade.score}</td>
                    <td><button onclick="deleteGrade('${grade._id}')">Delete</button></td>
                </tr>`;
        })
        .catch(error => console.error('Error fetching grade:', error));
});

// Function to delete a grade by ID
function deleteGrade(gradeId) {
    fetch(`/api/grades/${gradeId}`, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error deleting grade');
            }
            // Remove the grade from the displayed list after deletion
            const gradesDiv = document.getElementById('gradeTable');
            gradesDiv.innerHTML = gradesDiv.innerHTML.replace(/<tr[^>]*>([^<]*)<td[^>]*>([^<]*)<\/td>.*?<\/tr>/, '');
        })
        .catch(error => console.error('Error deleting grade:', error));
}
