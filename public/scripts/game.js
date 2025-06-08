

const init = () => {
    getQuestions();
}

const getQuestions = async () => {
    const url = './data/questions.json';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Fetch failed: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error('Error loading questions:', error.message);
    }
}

init();