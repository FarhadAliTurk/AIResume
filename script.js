document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resumeForm');
    const preview = document.getElementById('preview');
    const resumeOutput = document.getElementById('resumeOutput');

    document.getElementById('generateBtn').addEventListener('click', () => {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        if (data.image && data.image.size > 0) {
            const reader = new FileReader();
            reader.onload = e => {
                data.imageUrl = e.target.result;
                generateResume(data);
            };
            reader.readAsDataURL(data.image);
        } else {
            generateResume(data);
        }
    });

    document.getElementById('downloadBtn').addEventListener('click', downloadResume);
    document.getElementById('clearBtn').addEventListener('click', clearForm);

    function generateResume({ name, email, phone, skills, experience, education, languages, certifications, references, imageUrl = 'https://via.placeholder.com/80' }) {
        if (!name || !email) {
            alert('Please fill out the required fields: Full Name and Email.');
            return;
        }

        resumeOutput.innerHTML = `
            <div class="resume-header">
                <img src="${imageUrl}" alt="Profile Picture">
                <div>
                    <h2>${name}</h2>
                    <p><i class="fas fa-envelope" aria-hidden="true"></i> ${email}</p>
                    <p><i class="fas fa-phone" aria-hidden="true"></i> ${phone}</p>
                </div>
            </div>
            <div class="resume-section">
                <h3><i class="fas fa-tools" aria-hidden="true"></i> Skills</h3>
                <p>${skills}</p>
            </div>
            <div class="resume-section">
                <h3><i class="fas fa-briefcase" aria-hidden="true"></i> Experience</h3>
                <p>${experience}</p>
            </div>
            <div class="resume-section">
                <h3><i class="fas fa-graduation-cap" aria-hidden="true"></i> Education</h3>
                <p>${education}</p>
            </div>
            <div class="resume-section">
                <h3><i class="fas fa-language" aria-hidden="true"></i> Languages</h3>
                <p>${languages}</p>
            </div>
            <div class="resume-section">
                <h3><i class="fas fa-certificate" aria-hidden="true"></i> Certifications</h3>
                <p>${certifications}</p>
            </div>
            <div class="resume-section">
                <h3><i class="fas fa-user-friends" aria-hidden="true"></i> References</h3>
                <p>${references}</p>
            </div>
        `;
        preview.hidden = false;
    }

    function downloadResume() {
        if (resumeOutput.innerHTML.trim() === '') {
            alert('Please generate the resume preview first.');
            return;
        }

        const opt = {
            margin: 1,
            filename: 'resume.pdf',
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().from(resumeOutput).set(opt).save();
    }

    function clearForm() {
        form.reset();
        preview.hidden = true;
    }
});