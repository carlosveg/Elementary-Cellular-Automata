clc;
close all;

from = csvread('./108,201/from_108_n15.txt');
to = csvread('./108,201/to_108_n15.txt');

%disp(from);

G = digraph(from, to);

pt = plot(G,'Layout','force');
pt.NodeLabel = {};