//! 유틸 함수, 블로그 업로드전 사용합니다. 블로그내 첨가된 확장자를 변환합니다.

const fs = require('fs');
const path = require('path');
const webp = require('webp-converter');

const inputFolder = path.join('public', 'img');

const convertToWebP = async () => {
    fs.readdir(inputFolder, async (err, files) => {
        if (err) {
            console.error('경로가 잘못됨', err);
            process.exit(1);
        }

        for (const file of files) {
            const inputFilePath = path.join(inputFolder, file);
            const outputFilePath = path.join(inputFolder, `${path.parse(file).name}.webp`);

            // Check if the current path is a file
            if (fs.lstatSync(inputFilePath).isFile()) {
                const fileExtension = path.extname(file).toLowerCase();
                if (['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'].includes(fileExtension)) {
                    try {
                        await webp.cwebp(inputFilePath, outputFilePath, '-q 80');
                        console.log(`${file} webp로 변환 완료`);

                        // Delete the original file
                        fs.unlink(inputFilePath, (err) => {
                            if (err) {
                                console.error(`삭제 실패 ${file}:`, err);
                            } else {
                                console.log(`${file} 삭제 성공`);
                            }
                        });
                    } catch (error) {
                        console.error(`변환 실패 ${file}:`, error);
                    }
                }
            }
        }
        console.log('변환 작업 완료');
    });
};

convertToWebP();
