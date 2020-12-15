import React, { useState, useEffect } from "react";
import { createFFmpeg, fetchFile, FFmpeg } from "@ffmpeg/ffmpeg";
import logo from './logo.svg';
import './App.css';

const ffmpeg: FFmpeg = createFFmpeg({ log: true });

function App() {
	const loadable = !!window.SharedArrayBuffer;
    const [ready, setReady] = useState<boolean>(false);
    const [input, setInput] = useState<{ file: File; type: string; }>();
    const [output, setOutput] = useState<string>("");

	const load = async () => {
		await ffmpeg.load();
		setReady(true);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;

        if (files !== null && files[0]) {
            const file = files[0];
            const { type } = file;

            if (type === "image/gif" || type === "video/mp4") {
                setInput({
                    file,
                    type,
                });
            }
        }
	};
	
	const convertFile = async () => {
		if (input === undefined) return;
		
        const { file, type } = input;

        if (type === "image/gif") {
            // convert gif to mp4

            ffmpeg.FS("writeFile", "input.gif", await fetchFile(file));
            await ffmpeg.run(
                "-f",
                "gif",
                "-i",
                "input.gif",
                "-movflags",
                "+faststart",
                "-pix_fmt",
                "yuv420p",
                "-vf",
                "scale=trunc(iw/2)*2:trunc(ih/2)*2",
                "output.mp4"
            );

            const data = ffmpeg.FS("readFile", "output.mp4");

            const url = URL.createObjectURL(
                new Blob([data.buffer], { type: "video/mp4" })
            );

            setOutput(url);
        } else {
            // convert mp4 to gif

            ffmpeg.FS("writeFile", "input.mp4", await fetchFile(file));
            await ffmpeg.run(
                "-f",
                "mp4",
                "-i",
                "input.mp4",
                "-t",
                "10",
                "-loop",
                "0",
                "-filter_complex",
                "[0:v] split [a][b];[a] palettegen [p];[b][p] paletteuse",
                "output.gif"
            );

            const data = ffmpeg.FS("readFile", "output.gif");

            const url = URL.createObjectURL(
                new Blob([data.buffer], { type: "image/gif" })
            );

            setOutput(url);
        }
    };

	// Hook : 렌더 후 실행
	useEffect(() => {
		load();
	}, []);

	useEffect(() => {
        convertFile();
    }, [input]);

	return (
		<>
            {ready ? (
                <>
                    <input type="file" onChange={handleChange} />

                    {input && output && (
                        <div>
                            {input.type === "image/gif" ? (
                                <video
                                    src={output}
                                    autoPlay
                                    muted
                                    playsInline
                                    loop
                                ></video>
                            ) : (
                                <img src={output} />
                            )}
                        </div>
                    )}
                </>
            ) : loadable ? (
                <div>Loading FFmpeg</div>
            ) : (
                <div>지원되지 않는 브라우저입니다.</div>
            )}
        </>
	);
}

export default App;
