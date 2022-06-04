clc;
close all;

from = csvread('./72,237/from_72_n15.txt');
to = csvread('./72,237/to_72_n15.txt');

%disp(from);

G = digraph(from, to);

pt = plot(G,'Layout','force');
pt.NodeLabel = {};