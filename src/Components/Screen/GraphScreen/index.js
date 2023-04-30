import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import constructEvalExpr from "../../../Actions/constructEvalExpr";
import { compile, range } from "mathjs";

const GraphScreen = ({ inputData }) => {
	const windowSettings = useSelector((state) => state.window.config);
	const canvasRef = useRef();

	const colors = [
		"#ff80ed",
		"#065535",
		"#000000",
		"#ff0000",
		"#ffd700",
		"#00ffff",
		"#0000ff",
		"#fa8072",
		"#8b0000",
		"#00ff00",
	];
	const Graph = function (config) {
		/**
		 * the Graph Class inititates the Graph layout using values from
		 * the windowSettings store
		 */
		// user defined properties
		this.canvas = canvasRef.current;
		this.xMin = config.xMin;
		this.yMin = config.yMin;
		this.xMax = config.xMax;
		this.yMax = config.yMax;
		this.xScl = config.xScl;
		this.yScl = config.yScl;
		this.xRes = config.xRes;

		// constants
		this.axisColor = "#aaa";
		this.font = "8pt Calibri";
		this.tickSize = 10;
		this.lineWidth = 2;

		// relationships
		this.ctx = this.canvas.getContext("2d");
		this.xRange = this.xMax - this.xMin;
		this.yRange = this.yMax - this.yMin;
		this.xUnit = this.canvas.width / this.xRange;
		this.yUnit = this.canvas.height / this.yRange;
		this.yCenter = Math.round(
			Math.abs(this.yMin / this.yRange) * this.canvas.height
		);
		this.xCenter = Math.round(
			Math.abs(this.xMin / this.xRange) * this.canvas.width
		);
		this.iteration = this.xRes / 150;
		this.xScale = this.canvas.width / this.xRange;
		this.yScale = this.canvas.height / this.yRange;

		// draw x and y axis
		this.drawXAxis();
		this.drawYAxis();
	};

	Graph.prototype.drawXAxis = function () {
		var ctx = this.ctx;
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(0, this.yCenter);
		ctx.lineTo(this.canvas.width, this.yCenter);
		ctx.strokeStyle = this.axisColor;
		ctx.lineWidth = this.lineWidth;
		ctx.stroke();

		// draw tick marks
		var xPosIncrement = this.xScl * this.xUnit,
			xPos,
			unit;
		ctx.font = this.font;
		ctx.textAlign = "center";
		ctx.textBaseline = "top";

		// draw left tick marks
		xPos = this.xCenter - xPosIncrement;
		unit = -1 * this.xScl;
		while (xPos > 0) {
			ctx.moveTo(xPos, this.yCenter - this.tickSize / 2);
			ctx.lineTo(xPos, this.yCenter + this.tickSize / 2);
			ctx.stroke();
			ctx.fillText(unit, xPos, this.yCenter + this.tickSize / 2 + 3);
			unit -= this.xScl;
			xPos = Math.round(xPos - xPosIncrement);
		}

		// draw right tick marks
		xPos = this.xCenter + xPosIncrement;
		unit = this.xScl;
		while (xPos < this.canvas.width) {
			ctx.moveTo(xPos, this.yCenter - this.tickSize / 2);
			ctx.lineTo(xPos, this.yCenter + this.tickSize / 2);
			ctx.stroke();
			ctx.fillText(unit, xPos, this.yCenter + this.tickSize / 2 + 3);
			unit += this.xScl;
			xPos = Math.round(xPos + xPosIncrement);
		}
		ctx.restore();
	};

	Graph.prototype.drawYAxis = function () {
		var ctx = this.ctx;
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(this.xCenter, 0);
		ctx.lineTo(this.xCenter, this.canvas.height);
		ctx.strokeStyle = this.axisColor;
		ctx.lineWidth = this.lineWidth;
		ctx.stroke();

		// draw tick marks
		var yPosIncrement = this.yScl * this.yUnit,
			yPos,
			unit;
		ctx.font = this.font;
		ctx.textAlign = "right";
		ctx.textBaseline = "middle";

		// draw top tick marks
		yPos = this.yCenter - yPosIncrement;
		unit = this.yScl;
		while (yPos > 0) {
			ctx.moveTo(this.xCenter - this.tickSize / 2, yPos);
			ctx.lineTo(this.xCenter + this.tickSize / 2, yPos);
			ctx.stroke();
			ctx.fillText(unit, this.xCenter + this.tickSize / 2 - 12, yPos);
			unit += this.yScl;
			yPos = Math.round(yPos - yPosIncrement);
		}

		// draw bottom tick marks
		yPos = this.yCenter + yPosIncrement;
		unit = -1 * this.yScl;
		while (yPos < this.canvas.height) {
			ctx.moveTo(this.xCenter - this.tickSize / 2, yPos);
			ctx.lineTo(this.xCenter + this.tickSize / 2, yPos);
			ctx.stroke();
			ctx.fillText(unit, this.xCenter + this.tickSize / 2 - 12, yPos);
			unit -= this.yScl;
			yPos = Math.round(yPos + yPosIncrement);
		}
		ctx.restore();
	};

	Graph.prototype.drawEquation = function (exprFunc, color, linePx) {
		var ctx = this.ctx;
		ctx.save();
		ctx.save();
		this.transformContext();

		ctx.beginPath();
		ctx.moveTo(this.xMin, exprFunc(this.xMin));

		for (var x = this.xMin; x <= this.xMax; x += this.iteration) {
			ctx.lineTo(x, exprFunc(x));
		}

		ctx.restore();
		ctx.lineJoin = "round";
		ctx.lineWidth = linePx;
		ctx.strokeStyle = color;
		ctx.stroke();
		ctx.restore();
	};

	Graph.prototype.transformContext = function () {
		var ctx = this.ctx;

		// move ctx to center of canvas
		this.ctx.translate(this.xCenter, this.yCenter);

		ctx.scale(this.xScale, -this.yScale);
	};
	function draw() {
		var graphItem = new Graph({
			xMin: windowSettings.find(([x, p]) => x === "xMin")[1],
			yMin: windowSettings.find(([x, p]) => x === "yMin")[1],
			xMax: windowSettings.find(([x, p]) => x === "xMax")[1],
			yMax: windowSettings.find(([x, p]) => x === "yMax")[1],
			xScl: windowSettings.find(([x, p]) => x === "xScl")[1],
			yScl: windowSettings.find(([x, p]) => x === "yScl")[1],
			xRes: windowSettings.find(([x, p]) => x === "xRes")[1],
		});
		if (inputData.length)
			inputData.forEach((expr, i) => {
				graphItem.drawEquation((x) => expr.evaluate({ x: x }), colors[i], 1.5);
			});
	}

	useEffect(() => {
		draw();
	}, [canvasRef, windowSettings]);

	return (
		<div className='screen'>
			<canvas ref={canvasRef} width='430' height='320'></canvas>
		</div>
	);
};

export default GraphScreen;
