let columns = document.getElementsByClassName('column');
let output = document.querySelector('.output');
let options = ['/', 'x', '-', '+', '=', '%', '.']
let onDone = false;

for (let i=0; i<columns.length; i++) {
    let column = columns[i];
    let column_content = column.textContent.trim();
    if (column_content === "=") {
        column.addEventListener('click', showOutput);
        continue;
    } else if (column_content === "C") {
        column.addEventListener('click', clearOutput);
    } else if (column_content === "R") {
        column.addEventListener('click', eraseOutput);
    } else {
        column.addEventListener('click', colClick);
    }

}

function colClick() {
    if (onDone && options.includes(this.textContent.trim())) {
        onDone = false;
    } else if (onDone) {
        output.textContent = '';
        onDone = false;
    }

    if (output.textContent.trim().length === 1
        && options.includes(this.textContent)
        && this.textContent !== '-'
        && this.textContent !== '.') {
        return;
    } else if (output.textContent.trim().length > 1
                && options.includes(output.textContent.trim().slice(-1))
                && options.includes(this.textContent.trim())) {
                    output.textContent = output.textContent.slice(0, -1) + this.textContent;
                    return;
                }

    if (output.textContent.trim() === '0'
        || output.textContent.trim() === 'Error') {
        output.textContent = '';
    }

    output.textContent += this.textContent;
}

function showOutput() {
    try {
        let result = eval(
            output.textContent.trim().replace(/x/g, '*')
        );

        if (result === 0) {
            output.textContent = '0';
        } else if (result.toString().includes('.')){
            if (result.toString().length > 5) {
                output.textContent = result.toExponential(5);
            } else {
                output.textContent = result;
            }
        } else {
            output.textContent = result;
        }
        onDone = true;
    } catch (error) {
        console.error(error, output.textContent.trim().replace(/x/g, '*'));
        output.textContent = 'Error'
    }
}

function clearOutput() {
    if (output.textContent.trim() !== '0') {output.textContent = '0'}
}

function eraseOutput() {
    if (output.textContent.trim() === '0') {return}

    output.textContent = output.textContent.slice(0, -1);
}