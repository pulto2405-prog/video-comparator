"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const App = () => {
    const [video1, setVideo1] = (0, react_1.useState)(null);
    const [video2, setVideo2] = (0, react_1.useState)(null);
    const [isPlaying, setIsPlaying] = (0, react_1.useState)(false);
    const [playbackRate, setPlaybackRate] = (0, react_1.useState)(1);
    const videoRef1 = (0, react_1.useRef)(null);
    const videoRef2 = (0, react_1.useRef)(null);
    const handleFileChange = (e, setVideo) => {
        const file = e.target.files?.[0];
        if (file) {
            setVideo(URL.createObjectURL(file));
        }
    };
    const syncPlay = () => {
        videoRef1.current?.play();
        videoRef2.current?.play();
        setIsPlaying(true);
    };
    const syncPause = () => {
        videoRef1.current?.pause();
        videoRef2.current?.pause();
        setIsPlaying(false);
    };
    const syncSeek = (e) => {
        const time = parseFloat(e.target.value);
        if (videoRef1.current)
            videoRef1.current.currentTime = time;
        if (videoRef2.current)
            videoRef2.current.currentTime = time;
    };
    const handlePlaybackRateChange = (rate) => {
        setPlaybackRate(rate);
        if (videoRef1.current)
            videoRef1.current.playbackRate = rate;
        if (videoRef2.current)
            videoRef2.current.playbackRate = rate;
    };
    // Sync effect for play/pause if one video is manually controlled
    (0, react_1.useEffect)(() => {
        const v1 = videoRef1.current;
        const v2 = videoRef2.current;
        if (v1 && v2) {
            const onPlay = () => { v2.play(); setIsPlaying(true); };
            const onPause = () => { v2.pause(); setIsPlaying(false); };
            const onSeek = () => { v2.currentTime = v1.currentTime; };
            v1.addEventListener('play', onPlay);
            v1.addEventListener('pause', onPause);
            v1.addEventListener('seeking', onSeek);
            return () => {
                v1.removeEventListener('play', onPlay);
                v1.removeEventListener('pause', onPause);
                v1.removeEventListener('seeking', onSeek);
            };
        }
    }, [video1, video2]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "container", children: [(0, jsx_runtime_1.jsx)("h1", { children: "Video Comparator" }), (0, jsx_runtime_1.jsxs)("div", { className: "upload-section", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { children: "Video 1: " }), (0, jsx_runtime_1.jsx)("input", { type: "file", accept: "video/*", onChange: (e) => handleFileChange(e, setVideo1) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { children: "Video 2: " }), (0, jsx_runtime_1.jsx)("input", { type: "file", accept: "video/*", onChange: (e) => handleFileChange(e, setVideo2) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "player-grid", children: [(0, jsx_runtime_1.jsxs)("div", { className: "video-wrapper", children: [(0, jsx_runtime_1.jsx)("h3", { children: "Video 1" }), video1 && (0, jsx_runtime_1.jsx)("video", { ref: videoRef1, src: video1, controls: false, width: "100%" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "video-wrapper", children: [(0, jsx_runtime_1.jsx)("h3", { children: "Video 2" }), video2 && (0, jsx_runtime_1.jsx)("video", { ref: videoRef2, src: video2, controls: false, width: "100%" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "controls", children: [(0, jsx_runtime_1.jsx)("button", { onClick: isPlaying ? syncPause : syncPlay, children: isPlaying ? 'Pause' : 'Play' }), (0, jsx_runtime_1.jsxs)("div", { className: "control-group", children: [(0, jsx_runtime_1.jsx)("label", { children: "Geschwindigkeit: " }), (0, jsx_runtime_1.jsxs)("select", { value: playbackRate, onChange: (e) => handlePlaybackRateChange(parseFloat(e.target.value)), children: [(0, jsx_runtime_1.jsx)("option", { value: "0.25", children: "0.25x" }), (0, jsx_runtime_1.jsx)("option", { value: "0.5", children: "0.5x" }), (0, jsx_runtime_1.jsx)("option", { value: "1", children: "1x" }), (0, jsx_runtime_1.jsx)("option", { value: "1.5", children: "1.5x" }), (0, jsx_runtime_1.jsx)("option", { value: "2", children: "2x" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "control-group", children: [(0, jsx_runtime_1.jsx)("label", { children: "Sync Seek: " }), (0, jsx_runtime_1.jsx)("input", { type: "range", min: "0", max: videoRef1.current?.duration || 100, step: "0.1", onChange: syncSeek })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "hints", children: (0, jsx_runtime_1.jsx)("p", { children: "Tipp: Nutze Video 1 als Master f\u00FCr Play/Pause/Seek." }) })] }));
};
exports.default = App;
//# sourceMappingURL=App.js.map