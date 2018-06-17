function matrix(n) {
    for (let i = 1; i <= n; i++) {
        let row = '';
        for (let j = 1; j <= n; j++) {
            if (j < n - i + 1) {
                row += '-'
            } else {
                if ( (j+i)%2 == 0) {
                    row += 'x'
                } else {
                    row += 'o'
                }
            }

        }
        console.log(row);
    }
}