/* eslint-disable no-unused-expressions */
import * as d3 from "d3";

//Empty object that has create function , will have update and destroy functions later -- GULAM[18/03/2020]--CREATED
const D3Chart = {};

//Create function that plots the chart -- GULAM[18/03/2020]--CREATED
D3Chart.create = (data, downloadPdf, downloadZipFile) => {
  var div = document.createElement("div");
  div.className += "sunburstContainer";
  div.style.width = "60%";
  div.style.height = "100%";
  div.style.left = "200px";

  document.getElementById("main").appendChild(div);

  var btn = document.createElement("BUTTON"); // Create a <button> element
  btn.className += "btn-class";
  btn.style.display = "none";
  btn.style.border = "none";
  btn.style.backgroundColor = "white";
  btn.style.boxShadow = "0 0 10px e4e4e4";
  btn.style.fontSize = "12px";
  btn.style.width = "100px";
  btn.style.fontWeight = "bold";
  btn.style.position = "absolute";
  btn.style.outline = "none";
  btn.style.height = "30px";
  btn.style.border = "1px solid rgb(91,131,195)";
  btn.style.borderRadius = "8px";
  btn.addEventListener("mouseenter", (e) => {
    btn.style.color = "rgb(91,131,195)";
    btn.style.cursor = "pointer";
    btn.style.borderLeft = "4px solid rgb(91,131,195)";
  });
  btn.addEventListener("mouseleave", (e) => {
    btn.style.color = "black";
    btn.style.borderLeft = "1px solid rgb(91,131,195)";
    btn.style.display = "none";
  });

  btn.innerHTML = "View report"; // Insert text
  document.body.appendChild(btn);

  // btn.setAttribute("onclick", ViewReportFunction);

  var topicBtn = document.createElement("BUTTON"); // Create a <button> element
  topicBtn.className += "topicBtn-class";
  topicBtn.style.display = "none";
  topicBtn.innerHTML = "Download zip file"; // Insert text
  topicBtn.style.outline = "none";
  topicBtn.style.border = "none";
  topicBtn.style.backgroundColor = "white";
  topicBtn.style.boxShadow = "0 0 10px e4e4e4";
  topicBtn.style.fontSize = "12px";
  topicBtn.style.width = "120px";
  topicBtn.style.fontWeight = "bold";
  topicBtn.style.position = "absolute";
  topicBtn.style.height = "30px";
  topicBtn.style.border = "1px solid rgb(91,131,195)";
  topicBtn.style.borderRadius = "8px";
  topicBtn.style.padding = "2px";
  topicBtn.addEventListener("mouseenter", (e) => {
    topicBtn.style.color = "rgb(91,131,195)";
    topicBtn.style.cursor = "pointer";
    topicBtn.style.borderLeft = "4px solid rgb(91,131,195)";
  });
  topicBtn.addEventListener("mouseleave", (e) => {
    topicBtn.style.color = "black";
    topicBtn.style.borderLeft = "1px solid rgb(91,131,195)";
    topicBtn.style.display = "none";
  });
  document.body.appendChild(topicBtn);

  // topicBtn.setAttribute("onclick", downloadZip);

  const width = window.innerWidth,
    height = window.innerHeight,
    maxRadius = Math.min(width, height) / 2 - 5;

  const formatNumber = d3.format(",d");

  const x = d3
    .scaleLinear()
    .range([0, 2 * Math.PI])
    .clamp(true);

  const y = d3.scaleSqrt().range([maxRadius * 0.1, maxRadius]);

  const partition = d3.partition();

  //Arc calculated arc angles in sunburst -- GULAM[18/03/2020]--CREATED
  const arc = d3
    .arc()
    .startAngle((d) => x(d.x0))
    .endAngle((d) => x(d.x1))
    .innerRadius((d) => Math.max(0, y(d.y0)))
    .outerRadius((d) => Math.max(0, y(d.y1)));

  const middleArcLine = (d) => {
    const halfPi = Math.PI / 2;
    const angles = [x(d.x0) - halfPi, x(d.x1) - halfPi];
    const r = Math.max(0, (y(d.y0) + y(d.y1)) / 2);

    const middleAngle = (angles[1] + angles[0]) / 2;
    const invertDirection = middleAngle > 0 && middleAngle < Math.PI;
    if (invertDirection) {
      angles.reverse();
    }

    //Calculates svg path in x0,x1,y0,y1 format --GULAM[18/03/2020]--CREATED
    const path = d3.path();
    path.arc(0, 0, r, angles[0], angles[1], invertDirection);

    return path.toString();
  };

  //Method provided by D3 to calculate space in a D3 arc -- GULAM[18/03/2020]--CREATED
  const textFits = (d) => {
    const CHAR_SPACE = 6;

    const deltaAngle = x(d.x1) - x(d.x0);
    const r = Math.max(0, (y(d.y0) + y(d.y1)) / 2);
    const perimeter = r * deltaAngle;

    return d.data.name.length * CHAR_SPACE < perimeter;
  };

  //The main svg where we pass the body of DOM and give height and width -- GULAM[18/03/2020]--CREATED

  const svg = d3
    .select(".sunburstContainer")
    .append("svg")

    .style("width", "60vw")
    .style("height", "100vh")
    .attr("viewBox", "-200 -400 300 800")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .on("click", () => {
      focusOn();
      d3.select("btn-class").style("display", "none"),
        d3.select("topicBtn-class").style("display", "none");
    }); // Reset zoom on canvas click

  var root = {
    name: "flare",
    children: [
      {
        name: "analytics",
        children: [
          {
            name: "cluster",
            children: [
              { name: "AgglomerativeCluster", size: 3938 },
              { name: "CommunityStructure", size: 3812 },
              { name: "HierarchicalCluster", size: 6714 },
              { name: "MergeEdge", size: 743 },
            ],
          },
          {
            name: "graph",
            children: [
              { name: "BetweennessCentrality", size: 3534 },
              { name: "LinkDistance", size: 5731 },
              { name: "MaxFlowMinCut", size: 7840 },
              { name: "ShortestPaths", size: 5914 },
              { name: "SpanningTree", size: 3416 },
            ],
          },
          {
            name: "optimization",
            children: [{ name: "AspectRatioBanker", size: 7074 }],
          },
        ],
      },
      {
        name: "animate",
        children: [
          { name: "Easing", size: 17010 },
          { name: "FunctionSequence", size: 5842 },
          {
            name: "interpolate",
            children: [
              { name: "ArrayInterpolator", size: 1983 },
              { name: "ColorInterpolator", size: 2047 },
              { name: "DateInterpolator", size: 1375 },
              { name: "Interpolator", size: 8746 },
              { name: "MatrixInterpolator", size: 2202 },
              { name: "NumberInterpolator", size: 1382 },
              { name: "ObjectInterpolator", size: 1629 },
              { name: "PointInterpolator", size: 1675 },
              { name: "RectangleInterpolator", size: 2042 },
            ],
          },
          { name: "ISchedulable", size: 1041 },
          { name: "Parallel", size: 5176 },
          { name: "Pause", size: 449 },
          { name: "Scheduler", size: 5593 },
          { name: "Sequence", size: 5534 },
          { name: "Transition", size: 9201 },
          { name: "Transitioner", size: 19975 },
          { name: "TransitionEvent", size: 1116 },
          { name: "Tween", size: 6006 },
        ],
      },
      {
        name: "data",
        children: [
          {
            name: "converters",
            children: [
              { name: "Converters", size: 721 },
              { name: "DelimitedTextConverter", size: 4294 },
              { name: "GraphMLConverter", size: 9800 },
              { name: "IDataConverter", size: 1314 },
              { name: "JSONConverter", size: 2220 },
            ],
          },
          { name: "DataField", size: 1759 },
          { name: "DataSchema", size: 2165 },
          { name: "DataSet", size: 586 },
          { name: "DataSource", size: 3331 },
          { name: "DataTable", size: 772 },
          { name: "DataUtil", size: 3322 },
        ],
      },
      {
        name: "display",
        children: [
          { name: "DirtySprite", size: 8833 },
          { name: "LineSprite", size: 1732 },
          { name: "RectSprite", size: 3623 },
          { name: "TextSprite", size: 10066 },
        ],
      },
      {
        name: "flex",
        children: [{ name: "FlareVis", size: 4116 }],
      },
      {
        name: "physics",
        children: [
          { name: "DragForce", size: 1082 },
          { name: "GravityForce", size: 1336 },
          { name: "IForce", size: 319 },
          { name: "NBodyForce", size: 10498 },
          { name: "Particle", size: 2822 },
          { name: "Simulation", size: 9983 },
          { name: "Spring", size: 2213 },
          { name: "SpringForce", size: 1681 },
        ],
      },
      {
        name: "query",
        children: [
          { name: "AggregateExpression", size: 1616 },
          { name: "And", size: 1027 },
          { name: "Arithmetic", size: 3891 },
          { name: "Average", size: 891 },
          { name: "BinaryExpression", size: 2893 },
          { name: "Comparison", size: 5103 },
          { name: "CompositeExpression", size: 3677 },
          { name: "Count", size: 781 },
          { name: "DateUtil", size: 4141 },
          { name: "Distinct", size: 933 },
          { name: "Expression", size: 5130 },
          { name: "ExpressionIterator", size: 3617 },
          { name: "Fn", size: 3240 },
          { name: "If", size: 2732 },
          { name: "IsA", size: 2039 },
          { name: "Literal", size: 1214 },
          { name: "Match", size: 3748 },
          { name: "Maximum", size: 843 },
          {
            name: "methods",
            children: [
              { name: "add", size: 593 },
              { name: "and", size: 330 },
              { name: "average", size: 287 },
              { name: "count", size: 277 },
              { name: "distinct", size: 292 },
              { name: "div", size: 595 },
              { name: "eq", size: 594 },
              { name: "fn", size: 460 },
              { name: "gt", size: 603 },
              { name: "gte", size: 625 },
              { name: "iff", size: 748 },
              { name: "isa", size: 461 },
              { name: "lt", size: 597 },
              { name: "lte", size: 619 },
              { name: "max", size: 283 },
              { name: "min", size: 283 },
              { name: "mod", size: 591 },
              { name: "mul", size: 603 },
              { name: "neq", size: 599 },
              { name: "not", size: 386 },
              { name: "or", size: 323 },
              { name: "orderby", size: 307 },
              { name: "range", size: 772 },
              { name: "select", size: 296 },
              { name: "stddev", size: 363 },
              { name: "sub", size: 600 },
              { name: "sum", size: 280 },
              { name: "update", size: 307 },
              { name: "variance", size: 335 },
              { name: "where", size: 299 },
              { name: "xor", size: 354 },
              { name: "_", size: 264 },
            ],
          },
          { name: "Minimum", size: 843 },
          { name: "Not", size: 1554 },
          { name: "Or", size: 970 },
          { name: "Query", size: 13896 },
          { name: "Range", size: 1594 },
          { name: "StringUtil", size: 4130 },
          { name: "Sum", size: 791 },
          { name: "Variable", size: 1124 },
          { name: "Variance", size: 1876 },
          { name: "Xor", size: 1101 },
        ],
      },
      {
        name: "scale",
        children: [
          { name: "IScaleMap", size: 2105 },
          { name: "LinearScale", size: 1316 },
          { name: "LogScale", size: 3151 },
          { name: "OrdinalScale", size: 3770 },
          { name: "QuantileScale", size: 2435 },
          { name: "QuantitativeScale", size: 4839 },
          { name: "RootScale", size: 1756 },
          { name: "Scale", size: 4268 },
          { name: "ScaleType", size: 1821 },
          { name: "TimeScale", size: 5833 },
        ],
      },
      {
        name: "util",
        children: [
          { name: "Arrays", size: 8258 },
          { name: "Colors", size: 10001 },
          { name: "Dates", size: 8217 },
          { name: "Displays", size: 12555 },
          { name: "Filter", size: 2324 },
          { name: "Geometry", size: 10993 },
          {
            name: "heap",
            children: [
              { name: "FibonacciHeap", size: 9354 },
              { name: "HeapNode", size: 1233 },
            ],
          },
          { name: "IEvaluable", size: 335 },
          { name: "IPredicate", size: 383 },
          { name: "IValueProxy", size: 874 },
          {
            name: "math",
            children: [
              { name: "DenseMatrix", size: 3165 },
              { name: "IMatrix", size: 2815 },
              { name: "SparseMatrix", size: 3366 },
            ],
          },
          { name: "Maths", size: 17705 },
          { name: "Orientation", size: 1486 },
          {
            name: "palette",
            children: [
              { name: "ColorPalette", size: 6367 },
              { name: "Palette", size: 1229 },
              { name: "ShapePalette", size: 2059 },
              { name: "SizePalette", size: 2291 },
            ],
          },
          { name: "Property", size: 5559 },
          { name: "Shapes", size: 19118 },
          { name: "Sort", size: 6887 },
          { name: "Stats", size: 6557 },
          { name: "Strings", size: 22026 },
        ],
      },
      {
        name: "vis",
        children: [
          {
            name: "axis",
            children: [
              { name: "Axes", size: 1302 },
              { name: "Axis", size: 24593 },
              { name: "AxisGridLine", size: 652 },
              { name: "AxisLabel", size: 636 },
              { name: "CartesianAxes", size: 6703 },
            ],
          },
          {
            name: "controls",
            children: [
              { name: "AnchorControl", size: 2138 },
              { name: "ClickControl", size: 3824 },
              { name: "Control", size: 1353 },
              { name: "ControlList", size: 4665 },
              { name: "DragControl", size: 2649 },
              { name: "ExpandControl", size: 2832 },
              { name: "HoverControl", size: 4896 },
              { name: "IControl", size: 763 },
              { name: "PanZoomControl", size: 5222 },
              { name: "SelectionControl", size: 7862 },
              { name: "TooltipControl", size: 8435 },
            ],
          },
          {
            name: "data",
            children: [
              { name: "Data", size: 20544 },
              { name: "DataList", size: 19788 },
              { name: "DataSprite", size: 10349 },
              { name: "EdgeSprite", size: 3301 },
              { name: "NodeSprite", size: 19382 },
              {
                name: "render",
                children: [
                  { name: "ArrowType", size: 698 },
                  { name: "EdgeRenderer", size: 5569 },
                  { name: "IRenderer", size: 353 },
                  { name: "ShapeRenderer", size: 2247 },
                ],
              },
              { name: "ScaleBinding", size: 11275 },
              { name: "Tree", size: 7147 },
              { name: "TreeBuilder", size: 9930 },
            ],
          },
          {
            name: "events",
            children: [
              { name: "DataEvent", size: 2313 },
              { name: "SelectionEvent", size: 1880 },
              { name: "TooltipEvent", size: 1701 },
              { name: "VisualizationEvent", size: 1117 },
            ],
          },
          {
            name: "legend",
            children: [
              { name: "Legend", size: 20859 },
              { name: "LegendItem", size: 4614 },
              { name: "LegendRange", size: 10530 },
            ],
          },
          {
            name: "operator",
            children: [
              {
                name: "distortion",
                children: [
                  { name: "BifocalDistortion", size: 4461 },
                  { name: "Distortion", size: 6314 },
                  { name: "FisheyeDistortion", size: 3444 },
                ],
              },
              {
                name: "encoder",
                children: [
                  { name: "ColorEncoder", size: 3179 },
                  { name: "Encoder", size: 4060 },
                  { name: "PropertyEncoder", size: 4138 },
                  { name: "ShapeEncoder", size: 1690 },
                  { name: "SizeEncoder", size: 1830 },
                ],
              },
              {
                name: "filter",
                children: [
                  { name: "FisheyeTreeFilter", size: 5219 },
                  { name: "GraphDistanceFilter", size: 3165 },
                  { name: "VisibilityFilter", size: 3509 },
                ],
              },
              { name: "IOperator", size: 1286 },
              {
                name: "label",
                children: [
                  { name: "Labeler", size: 9956 },
                  { name: "RadialLabeler", size: 3899 },
                  { name: "StackedAreaLabeler", size: 3202 },
                ],
              },
              {
                name: "layout",
                children: [
                  { name: "AxisLayout", size: 6725 },
                  { name: "BundledEdgeRouter", size: 3727 },
                  { name: "CircleLayout", size: 9317 },
                  { name: "CirclePackingLayout", size: 12003 },
                  { name: "DendrogramLayout", size: 4853 },
                  { name: "ForceDirectedLayout", size: 8411 },
                  { name: "IcicleTreeLayout", size: 4864 },
                  { name: "IndentedTreeLayout", size: 3174 },
                  { name: "Layout", size: 7881 },
                  { name: "NodeLinkTreeLayout", size: 12870 },
                  { name: "PieLayout", size: 2728 },
                  { name: "RadialTreeLayout", size: 12348 },
                  { name: "RandomLayout", size: 870 },
                  { name: "StackedAreaLayout", size: 9121 },
                  { name: "TreeMapLayout", size: 9191 },
                ],
              },
              { name: "Operator", size: 2490 },
              { name: "OperatorList", size: 5248 },
              { name: "OperatorSequence", size: 4190 },
              { name: "OperatorSwitch", size: 2581 },
              { name: "SortOperator", size: 2023 },
            ],
          },
          { name: "Visualization", size: 16540 },
        ],
      },
    ],
  };
  const color = d3.scaleOrdinal(
    d3.quantize(d3.interpolateRainbow, root.children.length + 1)
  );
  // const color = d3.scaleOrdinal(d3.schemeCategory20);

  svg.on("click", (d) => {
    d3.select(".btn-class").style("display", "none");
    d3.select(".topicBtn-class").style("display", "none");
  });

  root = d3.hierarchy(root);

  root.sum((d) => d.size);

  const slice = svg.selectAll("g.slice").data(partition(root).descendants());

  slice
    .filter((d) => d.children)
    .style("cursor", "pointer")
    .on("click", (d) => {
      d3.select(btn).style("display", "none");
    });

  slice.exit().remove();

  //Child node
  const newSlice = slice

    .enter()
    .append("g")
    .attr("class", "slice")

    .on("click", (d) => {
      console.log(d);
      d3.select(".btn-class").style("display", "none");
      d3.select(".topicBtn-class").style("display", "none");
      d3.event.stopPropagation();
      focusOn(d);
    })
    .on("contextmenu", function () {
      d3.event.preventDefault();
    });

  //CHildren nodes opacity,title and fillcolor is calculated based on the height or depth from root node -- GULAM[18/03/2020]
  newSlice

    .append("title")
    .text((d) => d.data.name + "\n" + formatNumber(d.value));

  newSlice

    .append("path")

    .attr("class", (d) =>
      d.depth > 3 ? "outer-arc " : d.depth === 1 ? "topic-arc" : "main-arc"
    )

    .attr("fill", (d) => {
      if (d.x0 === 0 && d.y0 === 0 && d.x1 === 1 && d.y1 === 1) return "fff";
      while (d.depth > 1) d = d.parent;
      return color(d.data.name);
    })
    .attr(
      "fill-opacity",
      // d => (d.depth > 2 ? 0 : 0.4)
      (d) =>
        d.depth > 3
          ? 0.2
          : d.depth === 3
          ? 0.3
          : d.depth === 2
          ? 0.4
          : d.depth === 1
          ? 0.6
          : 0.85
      // arcVisible(d) ? 0.4 : 0
    )

    .attr("d", arc);

  d3.selectAll("path.topic-arc").on("contextmenu", function (data) {
    d3.selectAll(".btn-class").style("display", "none");
    if (d3.event.pageX || d3.event.pageY) {
      var x = d3.event.pageX;
      var y = d3.event.pageY;
    } else if (d3.event.clientX || d3.event.clientY) {
      var x =
        d3.event.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      var y =
        d3.event.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }

    d3.select(".topicBtn-class")
      .style("display", "block")
      .style("position", "absolute")
      .style("left", x + "px")
      .style("top", y + "px")
      .style("display", "block");

    d3.select(".btn").style("display", "none");

    topicBtn.onclick = function () {
      downloadZipFile(data.data.name);
    };

    d3.event.preventDefault();
  });

  d3.selectAll("path.outer-arc").on("contextmenu", function (data, index) {
    // var position = d3.mouse(this);

    if (d3.event.pageX || d3.event.pageY) {
      var xNew = d3.event.pageX;
      var yNew = d3.event.pageY;
    } else if (d3.event.clientX || d3.event.clientY) {
      var xNew =
        d3.event.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      var yNew =
        d3.event.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }
    // var position = d3.mouse(this);

    d3.select(btn)
      .style("display", "block")
      .style("position", "absolute")
      .style("left", xNew + "px")
      .style("top", yNew + "px");
    // .style("display", "block");

    d3.select(".topicBtn-class").style("display", "none");
    btn.onclick = function () {
      downloadPdf(data.data.name);
    };

    d3.event.preventDefault();
  });

  newSlice
    .append("path")
    .attr("class", "hidden-arc")
    .attr("id", (_, i) => `hiddenArc${i}`)
    .attr("d", middleArcLine);

  //Checking if text fits an arc --GULAM[18/03/2020]
  const text = newSlice
    .append("text")
    .attr("display", (d) => (textFits(d) ? null : "none"));

  //Add text attributes as defined in D3 -- GULAM[18/03/2020]
  text
    .append("textPath")
    .attr("startOffset", "50%")
    .attr("xlink:href", (_, i) => `#hiddenArc${i}`)
    .text((d) => d.data.name)
    .style("fill", "none")
    // .style("stroke", "#fff")
    .style("stroke-width", 2)
    .style("stroke-linejoin", "round")
    .style("font-family", "Sans-serif")
    .style("font-size", "5px")
    .on("contextmenu", () => {
      d3.event.preventDefault();
    });
  // .on("contextmenu", d3.contextMenu(menu));

  text
    .append("textPath")
    .attr("startOffset", "50%")
    .attr("xlink:href", (_, i) => `#hiddenArc${i}`)
    .text((d) => d.data.name);

  //Function that checks whether the outer layer should be visible,currently doesnt work as depth is not recalculated onclicking an arc

  function focusOn(d = { x0: 0, x1: 1, y0: 0, y1: 1 }) {
    // Reset to top-level if no data point specified

    const transition = svg
      .transition()
      .duration(750)
      .tween("scale", () => {
        const xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
          yd = d3.interpolate(y.domain(), [d.y0, 1]);
        return (t) => {
          x.domain(xd(t));
          y.domain(yd(t));
        };
      });

    transition
      .selectAll("path.main-arc ")
      .attrTween("d", (d1) => () => arc(d1));
    transition
      .selectAll("path.outer-arc ")
      .attrTween("d", (d2) => () => arc(d2));
    transition
      .selectAll("path.topic-arc ")
      .attrTween("d", (d3) => () => arc(d3));

    transition
      .selectAll("path.hidden-arc")
      .attrTween("d", (d4) => () => middleArcLine(d4));

    transition
      .selectAll("text")
      .attrTween("display", (d5) => () => (textFits(d5) ? null : "none"));

    moveStackToFront(d);

    //

    function moveStackToFront(elD) {
      svg
        .selectAll(".slice")
        .filter((d) => d === elD)
        .each(function (d) {
          this.parentNode.appendChild(this);
          if (d.parent) {
            moveStackToFront(d.parent);
          }
        });
    }
  }
};

export default D3Chart;
