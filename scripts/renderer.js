class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(framebuffer);
                break;
            case 1:
                this.drawSlide1(framebuffer);
                break;
            case 2:
                this.drawSlide2(framebuffer);
                break;
            case 3:
                this.drawSlide3(framebuffer);
                break;
        }

        this.ctx.putImageData(framebuffer, 0, 0);
    }

    // framebuffer:  canvas ctx image data
    drawSlide0(framebuffer) {
        // TODO: draw at least 2 Bezier curves
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        
        let red = [255, 0, 0, 255];
        let blue = [0, 0, 255, 255];
        let green = [0, 175, 0, 255];

        let coordArr_1 = [{x: 50, y: 100},
                          {x: 50, y: 500}, 
                          {x: 450, y: 500}, 
                          {x: 450, y: 100},];

        let coordArr_2 = [{x: 550, y: 550}, 
                          {x: 550, y: 200}, 
                          {x: 650, y: 400}, 
                          {x: 750, y: 300}];

        this.drawBezierCurve(coordArr_1[0], coordArr_1[1], coordArr_1[2], coordArr_1[3], this.num_curve_sections, red, framebuffer);
        this.drawBezierCurve(coordArr_2[0], coordArr_2[1], coordArr_2[2], coordArr_2[3], this.num_curve_sections, red, framebuffer);

        if (this.show_points == 1) {
            // Draw coordArr_1 coordinates
            for (let i = 0; i < coordArr_1.length; i++) {
                this.drawVertex(coordArr_1[i], blue, framebuffer);
            }

            // Draw coordArr_2 coordinates
            for (let i = 0; i < coordArr_2.length; i++) {
                this.drawVertex(coordArr_2[i], green, framebuffer);
            }
            
        }

    }

    // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer) {
        // TODO: draw at least 2 circles
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        
        let red = [255, 0, 0, 255];
        let blue = [0, 0, 255, 255];
        let green = [0, 175, 0, 255];

        let center1 = {x: 200, y: 200};
        let radius1 = 60;

        let center2 = {x: 600, y: 400};
        let radius2 = 100;

        let circle1 = this.drawCircle(center1, radius1, this.num_curve_sections, red, framebuffer);
        let circle2 = this.drawCircle(center2, radius2, this.num_curve_sections, red, framebuffer);

        if (this.show_points == 1) {
            // Draw first circle
            for (let i = 0; i < circle1.length; i++) {
                this.drawVertex(circle1[i], blue, framebuffer);
            }

            // Draw coordArr_2 coordinates
            for (let i = 0; i < circle2.length; i++) {
                this.drawVertex(circle2[i], green, framebuffer);
            }
        }
    }

    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer) {
        // TODO: draw at least 2 convex polygons (each with a different number of vertices >= 5)
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        
        let red = [255, 0, 0, 255];
        let blue = [0, 0, 255, 255];
        let green = [0, 175, 0, 255];

        let shape1 = [{x: 125, y: 125},
                      {x: 113, y: 156},
                      {x: 138, y: 188},
                      {x: 188, y: 219},
                      {x: 263, y: 250},
                      {x: 219, y: 188},
                      {x: 188, y: 150},
                      {x: 153, y: 125}];
                      
        let shape2 = [{x: 300, y: 300},
                      {x: 250, y: 400},
                      {x: 300, y: 500},
                      {x: 425, y: 500},
                      {x: 475, y: 400},
                      {x: 425, y: 300}];

        this.drawConvexPolygon(shape1, red, framebuffer);
        this.drawConvexPolygon(shape2, red, framebuffer);

        if (this.show_points == 1) {
            // Shape 1
            for (let i = 0; i < shape1.length; i++) {
                this.drawVertex(shape1[i], blue, framebuffer);
            }

            // Shape 2
            for (let i = 0; i < shape2.length; i++) {
                this.drawVertex(shape2[i], green, framebuffer);
            }
        }
    }

    // framebuffer:  canvas ctx image data
    drawSlide3(framebuffer) {
        // TODO: draw your name!
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        
        let red = [255, 0, 0, 255];
        let blue = [0, 0, 255, 255];
        let green = [0, 175, 0, 255];
        let white = [255, 255, 255, 255];
        let purple = [255, 0, 255, 255];

        // A
        let leftLine = [{x: 75, y: 200}, 
                        {x: 150, y: 400}, 
                        {x: 150, y: 350}, 
                        {x: 94, y: 200}];

        let rightLine = [{x: 219, y: 200}, 
                        {x: 150, y: 400}, 
                        {x: 150, y: 350}, 
                        {x: 200, y: 200}];

        let connection = [{x: 100, y: 260}, 
                          {x: 125, y: 285}, 
                          {x: 175, y: 285}, 
                          {x: 195, y: 260}];
        
        this.drawConvexPolygon(leftLine, red, framebuffer);
        this.drawConvexPolygon(rightLine, red, framebuffer);
        this.drawConvexPolygon(connection, red, framebuffer);

        // d
        let dCircle = this.drawCircle({x: 275, y: 250}, 50, this.num_curve_sections, red, framebuffer);
        this.drawLine({x: 325, y: 200}, {x: 325, y: 400}, red, framebuffer);
        
        // r
        this.drawLine({x: 350, y: 200}, {x: 350, y: 300}, red, framebuffer);
        this.drawBezierCurve({x: 350, y: 250}, {x: 350, y: 300}, {x: 400, y: 300}, {x: 400, y: 275}, this.num_curve_sections, red, framebuffer);

        // i
        this.drawLine({x: 425, y: 200}, {x: 425, y: 290}, red, framebuffer);
        let iCircle = this.drawCircle({x: 425, y: 310}, 10, this.num_curve_sections, red, framebuffer);

        // a
        let aCircle = [{x: 470, y: 200}, 
                       {x: 450, y: 225},
                       {x: 450, y: 275},
                       {x: 470, y: 300}, 
                       {x: 505, y: 300}, 
                       {x: 525, y: 250}, 
                       {x: 505, y: 200}];

        let aWhiteCircle = [{x: 475, y: 210}, 
                            {x: 460, y: 230},
                            {x: 460, y: 270},
                            {x: 475, y: 290}, 
                            {x: 499, y: 290}, 
                            {x: 515, y: 250}, 
                            {x: 499, y: 210}];

        this.drawConvexPolygon(aCircle, red, framebuffer);
        this.drawConvexPolygon(aWhiteCircle, white, framebuffer);
        this.drawBezierCurve({x: 525, y: 300}, {x: 525, y: 200}, {x: 535, y: 200}, {x: 535, y: 200}, this.num_curve_sections, red, framebuffer);

        // n
        this.drawLine({x: 550, y: 200}, {x: 550, y: 300}, red, framebuffer);
        this.drawBezierCurve({x: 550, y: 250}, {x: 550, y: 300}, {x: 600, y: 300}, {x: 610, y: 275}, this.num_curve_sections, red, framebuffer);
        this.drawLine({x: 610, y: 200}, {x: 610, y: 275}, red, framebuffer);

        if (this.show_points == 1) {
            // A
            for (let i = 0; i < leftLine.length; i++) {
                this.drawVertex(leftLine[i], green, framebuffer);
            }
            for (let i = 0; i < rightLine.length; i++) {
                this.drawVertex(rightLine[i], blue, framebuffer);
            }
            for (let i = 0; i < connection.length; i++) {
                this.drawVertex(connection[i], purple, framebuffer);
            }

            // d
            for (let i = 0; i < dCircle.length; i++) {
                this.drawVertex(dCircle[i], green, framebuffer);
            }

            this.drawVertex({x: 325, y: 200}, blue, framebuffer);
            this.drawVertex({x: 325, y: 400}, blue, framebuffer); 

            // r
            this.drawVertex({x: 350, y: 200}, green, framebuffer);
            this.drawVertex({x: 350, y: 300}, green, framebuffer);

            this.drawVertex({x: 350, y: 250}, blue, framebuffer);
            this.drawVertex({x: 350, y: 300}, blue, framebuffer);
            this.drawVertex({x: 400, y: 300}, blue, framebuffer);
            this.drawVertex({x: 400, y: 275}, blue, framebuffer);

            // i
            this.drawVertex({x: 425, y: 200}, green, framebuffer);
            this.drawVertex({x: 425, y: 290}, green, framebuffer);

            for (let i = 0; i < iCircle.length; i++) {
                this.drawVertex(iCircle[i], blue, framebuffer);
            }

            // a
            for (let i = 0; i < aCircle.length; i++) {
                this.drawVertex(aCircle[i], green, framebuffer);
            }

            for (let i = 0; i < aWhiteCircle.length; i++) {
                this.drawVertex(aWhiteCircle[i], blue, framebuffer);
            }

            this.drawVertex({x: 525, y: 300}, purple, framebuffer);
            this.drawVertex({x: 525, y: 200}, purple, framebuffer);
            this.drawVertex({x: 535, y: 200}, purple, framebuffer);
            this.drawVertex({x: 535, y: 200}, purple, framebuffer);

            // n
            this.drawVertex({x: 550, y: 200}, green, framebuffer);
            this.drawVertex({x: 550, y: 300}, green, framebuffer);

            this.drawVertex({x: 550, y: 250}, blue, framebuffer);
            this.drawVertex({x: 550, y: 300}, blue, framebuffer);
            this.drawVertex({x: 600, y: 300}, blue, framebuffer);
            this.drawVertex({x: 610, y: 275}, blue, framebuffer);

            this.drawVertex({x: 610, y: 200}, purple, framebuffer);
            this.drawVertex({x: 610, y: 275}, purple, framebuffer);
        }
    }

    // p0:           object {x: __, y: __}
    // p1:           object {x: __, y: __}
    // p2:           object {x: __, y: __}
    // p3:           object {x: __, y: __}
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawBezierCurve(p0, p1, p2, p3, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a Bezier curve
        let lines = [];
        let edge = 1/num_edges;
        let t = 0;

        /* Debugging
        console.log("==============================");
        console.log("num_edges: " + num_edges);
        console.log("edge: " + t);
        */

        for (let i = 0; i <= num_edges; i++) {
            let xcoord = (Math.pow(1-t, 3) * p0.x) + (3 * Math.pow(1-t, 2) * t * p1.x) + (3 * (1-t) * (Math.pow(t,2)) * p2.x) + ((Math.pow(t,3)) * p3.x);
            let ycoord = (Math.pow(1-t, 3) * p0.y) + (3 * Math.pow(1-t, 2) * t * p1.y) + (3 * (1-t) * (Math.pow(t,2)) * p2.y) + ((Math.pow(t,3)) * p3.y);

            xcoord = parseInt(xcoord);
            ycoord = parseInt(ycoord);
            t += edge;

            lines.push({x: xcoord, y: ycoord});

            /* Debugging
            console.log("\nX: " + xcoord);
            console.log("y: " + ycoord);
            */
        }

        /* Debugging
        console.log("_______________________________");
        console.log("lines.length: " + lines.length);
        */

        for (let i = 0; i < lines.length-1; i++) {
            this.drawLine({x: lines[i].x, y: lines[i].y}, {x: lines[i+1].x, y: lines[i+1].y}, color, framebuffer);
            
            /* Debugging
            console.log("\ni: " + i);
            console.log("i+1: " + (i+1));
            console.log("lines[i].x: " + lines[i].x);
            console.log("lines[i].y: " + lines[i].y);
            console.log("lines[i+1].x: " + lines[i+1].x);
            console.log("lines[i+1].y: " + lines[i+1].y);
            */
        }
    }

    // center:       object {x: __, y: __}
    // radius:       int
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawCircle(center, radius, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a circle
        
        let lines = [];
        let angle = 360/num_edges;
        let toRadian = (angle * Math.PI) / 180;
        let phi = 0;

        /* Debugging
        console.log("==============================");
        console.log("num_edges: " + num_edges);
        console.log("angle: " + angle);
        */

        for (let i = 0; i <= num_edges; i++) {
            let xcoord = center.x + (radius * Math.cos(phi));
            let ycoord = center.y + (radius * Math.sin(phi));

            xcoord = parseInt(xcoord);
            ycoord = parseInt(ycoord);
            phi += toRadian;

            lines.push({x: xcoord, y: ycoord});

            /* Debugging
            console.log("\nX: " + xcoord);
            console.log("Y: " + ycoord);
            console.log("T: " + phi);
            */
        }

        for (let i = 0; i < lines.length-1; i++) {
            this.drawLine({x: lines[i].x, y: lines[i].y}, {x: lines[i+1].x, y: lines[i+1].y}, color, framebuffer);
            
            /* Debugging
            console.log("\ni: " + i);
            console.log("i+1: " + (i+1));
            console.log("lines[i].x: " + lines[i].x);
            console.log("lines[i].y: " + lines[i].y);
            console.log("lines[i+1].x: " + lines[i+1].x);
            console.log("lines[i+1].y: " + lines[i+1].y);
            */
        }

        return lines;
    }
    
    // vertex_list:  array of object [{x: __, y: __}, {x: __, y: __}, ..., {x: __, y: __}]
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawConvexPolygon(vertex_list, color, framebuffer) {
        // TODO: draw a sequence of triangles to form a convex polygon

        for (let i = 0; i < vertex_list.length-2; i++) {
            this.drawTriangle(vertex_list[0], vertex_list[i+1], vertex_list[i+2], color, framebuffer);
            
            /* 
            console.log("\ni: " + i);
            console.log("Vertex[i+1].x: " + vertex_list[i+1].x);
            console.log("Vertex[i+2].y: " + vertex_list[i+1].y);
            console.log("Vertex[i+1].x: " + vertex_list[i+2].x);
            console.log("Vertex[i+2].y: " + vertex_list[i+2].y); 
            */
        }
        
    }
    
    // v:            object {x: __, y: __}
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawVertex(v, color, framebuffer) {
        // TODO: draw some symbol (e.g. small rectangle, two lines forming an X, ...) centered at position `v`
        
        // Bottom left corner of rectangle to Top left and bottom right
        this.drawLine({x: (v.x - 10), y: (v.y - 10)}, {x: (v.x - 10), y: (v.y + 10)}, color, framebuffer);
        this.drawLine({x: (v.x - 10), y: (v.y - 10)}, {x: (v.x + 10), y: (v.y - 10)}, color, framebuffer);

        // Top right corner of rectangle to Top left and bottom right
        this.drawLine({x: (v.x + 10), y: (v.y + 10)}, {x: (v.x - 10), y: (v.y + 10)}, color, framebuffer);
        this.drawLine({x: (v.x + 10), y: (v.y + 10)}, {x: (v.x + 10), y: (v.y - 10)}, color, framebuffer);
    }
    
    /***************************************************************
     ***       Basic Line and Triangle Drawing Routines          ***
     ***       (code provided from in-class activities)          ***
     ***************************************************************/
    pixelIndex(x, y, framebuffer) {
	    return 4 * y * framebuffer.width + 4 * x;
    }
    
    setFramebufferColor(framebuffer, px, color) {
	    framebuffer.data[px + 0] = color[0];
	    framebuffer.data[px + 1] = color[1];
	    framebuffer.data[px + 2] = color[2];
	    framebuffer.data[px + 3] = color[3];
    }
    
    swapPoints(a, b) {
        let tmp = {x: a.x, y: a.y};
        a.x = b.x;
        a.y = b.y;
        b.x = tmp.x;
        b.y = tmp.y;
    }

    drawLine(p0, p1, color, framebuffer) {
        if (Math.abs(p1.y - p0.y) <= Math.abs(p1.x - p0.x)) { // |m| <= 1
            if (p0.x < p1.x) {
                this.drawLineLow(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineLow(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
        else {                                        // |m| > 1
            if (p0.y < p1.y) {
                this.drawLineHigh(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineHigh(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
    }

    drawLineLow(x0, y0, x1, y1, color, framebuffer) {
        let A = y1 - y0;
        let B = x0 - x1;
        let iy = 1;
        if (A < 0) {
            iy = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let x = x0;
        let y = y0;
        let px;
        while (x <= x1)
        {
            px = this.pixelIndex(x, y, framebuffer);
            this.setFramebufferColor(framebuffer, px, color);
            x += 1;
            if (D <= 0)
            {
                D += 2 * A;
            }
            else
            {
                D += 2 * A + 2 * B;
                y += iy;
            }
        }
    }

    drawLineHigh(x0, y0, x1, y1, color, framebuffer) {
        let A = x1 - x0;
        let B = y0 - y1;
        let ix = 1;
        if (A < 0) {
            ix = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let x = x0;
        let y = y0;
        let px;
        while (y <= y1)
        {
            px = this.pixelIndex(x, y, framebuffer);
            this.setFramebufferColor(framebuffer, px, color);
            y += 1;
            if (D <= 0)
            {
                D += 2 * A;
            }
            else
            {
                D += 2 * A + 2 * B;
                x += ix;
            }
        }
    }
    
    drawTriangle(p0, p1, p2, color, framebuffer) {
        // Deep copy input points
        p0 = {x: p0.x, y: p0.y};
        p1 = {x: p1.x, y: p1.y};
        p2 = {x: p2.x, y: p2.y};

        // Sort points in ascending y order
        if (p1.y < p0.y) this.swapPoints(p0, p1);
        if (p2.y < p0.y) this.swapPoints(p0, p2);
        if (p2.y < p1.y) this.swapPoints(p1, p2);
        
        // Edge coherence triangle algorithm
        // Create initial edge table
        let edge_table = [
            {x: p0.x, inv_slope: (p1.x - p0.x) / (p1.y - p0.y)}, // edge01
            {x: p0.x, inv_slope: (p2.x - p0.x) / (p2.y - p0.y)}, // edge02
            {x: p1.x, inv_slope: (p2.x - p1.x) / (p2.y - p1.y)}  // edge12
        ];
        
        // Do cross product to determine if pt1 is to the right/left of edge02
        let v01 = {x: p1.x - p0.x, y: p1.y - p0.y};
        let v02 = {x: p2.x - p0.x, y: p2.y - p0.y};
        let p1_right = ((v01.x * v02.y) - (v01.y * v02.x)) >= 0;
        
        // Get the left and right edges from the edge table (lower half of triangle)
        let left_edge, right_edge;
        if (p1_right) {
            left_edge = edge_table[1];
            right_edge = edge_table[0];
        }
        else {
            left_edge = edge_table[0];
            right_edge = edge_table[1];
        }
        // Draw horizontal lines (lower half of triangle)
        for (let y = p0.y; y < p1.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) { 
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
        
        // Get the left and right edges from the edge table (upper half of triangle) - note only one edge changes
        if (p1_right) {
            right_edge = edge_table[2];
        }
        else {
            left_edge = edge_table[2];
        }
        // Draw horizontal lines (upper half of triangle)
        for (let y = p1.y; y < p2.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) {
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
    }
};
