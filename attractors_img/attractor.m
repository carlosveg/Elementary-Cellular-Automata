clc;
close all;

from = csvread('./13,69,79,93/from_13_n15.txt');
to = csvread('./13,69,79,93/to_13_n15.txt');

%disp(from)

G = digraph(from, to);

pt = plot(G,'Layout','force');
pt.NodeLabel = {};