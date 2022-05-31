clc;
close all;

from = csvread('./25,61,67,103/from_25_n15.txt');
to = csvread('./25,61,67,103/to_25_n15.txt');

%disp(from)

G = digraph(from, to);

pt = plot(G,'Layout','force');
pt.NodeLabel = {};